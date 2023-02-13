---
title: Macro for checking tuple of options
subtitle:
tags: [rust_lang, programming, software_engineering]
---

Today, I was programming and ran into a little issue. Before, I was using this macro (from [here](https://stackoverflow.com/a/40986547/10516390)):

```rust
#[macro_export]
macro_rules! all_or_nothing {
    ($($opt:expr),*) => {{
        if false $(|| $opt.is_none())* {
            None
        } else {
            Some(($($opt.expect("should never fail"),)*))
        }
    }};
}
```

to check a tuple of options to see if they were all available. I used it as follows:

```rust
pub fn create_bind_group(
    pipeline: Option<Res<RaytracingPipeline>>,
    raytracing_image: Option<Res<RaytracingImage>>,
    uniforms: Option<Res<RaytracingUniforms>>,
    bvh: Option<Res<RaytracingBVH>>,
    tris: Option<Res<RaytracingTriangles>>,
    lights: Option<Res<RaytracingLights>>,
    image_collection: Option<Res<ImageCollection>>,
    textures: Option<Res<DisneyTextures>>,
    /* more parameters that are non-optional */
) {
    if let Some((
        pipeline,
        raytracing_image,
        uniforms,
        bvh,
        tris,
        lights,
        image_collection,
        textures,
    )) = all_or_nothing!(
        pipeline,
        raytracing_image,
        uniforms,
        bvh,
        tris,
        lights,
        image_collection,
        textures
    ) {
        /* 
            do things on a gpu
        */
    }
}
``` 

Note that all the types inside the options are different, so I can't just iterate over a vector or array. I think I could box them and iterate over them as `Box<dyn Option>` or something similar but that sounded painful.

The problem is now I don't know which variables are `Some` and which are `None`. So I wrote this little macro:

```rust
#[macro_export]
macro_rules! check_for_none {
    ($($var:ident),*) => {{
        $(
            if $var.is_none() {
                println!("{} is none", stringify!($var));
            }
        )*
    }};
}
```

and I can just use it as follows:

```rust
check_for_none!(
    pipeline,
    raytracing_image,
    uniforms,
    bvh,
    tris,
    lights,
    image_collection,
    textures
);
```

Decided I'd put this on the blog because I would need 15 reptuation to answer my own question on Stack Overflow (and I really don't feel like having to appease a bunch of random people online just to have the """privilege""" of putting it on someone else's website.) 

Hopefully you find this useful!