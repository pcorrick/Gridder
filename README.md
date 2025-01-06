# Gridder

A couple of years ago i decide to build `nova-gridder`, probably inspired in other developer repository.

By the way, that was abandoned, for several reasons, this is a Nova 5 compatible, fresh grid system implementation based on tailwindcss.

There are no goals to reach some point of development.

![Gridder Usage](./result.png)

## Installation

As is usually, you need to install it using composer:

```
composer require zen0x7/gridder
```

## Usage

### Basic Usage

```php
public static function fields()
{
    return [
        Panel::make(__('Details'), [
            Text::make(__('Name'), 'name')
                ->withMeta([
                    "gridder" => [
                        "cols" => Gridder::$FIELD_ONE_OF_TWO_COLUMNS,
                        "type" => "stack"
                    ]
                ])  
        ])->withMeta([
            "gridder" => [
                "cols" => Gridder::$GRID_STATIC_TWO_COLUMNS
            ]
        ])
    ]
}
```

## Digging deep

Basically works with `meta`, you should to define columns per `field` and `panel`.

Cols attribute is something like, of course, they are `responsive breakpoints`:

```php
$cols = [
    "default" => 1, // On default should use 1 column
    "sm" => 2, // When device is on "sm" then use 2 columns (span)
    "md" => 2, // The same for the next ...
    "lg" => 2,
    "xl" => 2,
    "2xl" => 2,
]
```

## Advanced usage

If you want to use the `gridder` to take more advantage then:

Consider the following `Panel` meta attribute value:

> Check the comments ...

```php
$meta = [
    "gridder => [
        "default" => 1, // means "grid-cols-1"
        "sm" => 2, // means "sm:grid-cols-2"
        "md" => 3, // means "md:grid-cols-3"
        "lg" => 6, // means "lg:grid-cols-6"
        "xl" => 12, // means "xl:grid-cols-12"
        "2xl" => 12, // means "2xl:grid-cols-12"
    ]
]
```

Right now, you could assign `Field` meta attribute value:

```php
$meta = [
    "gridder => [
        "default" => 1, // This means "col-span-1", if there are 1 column available, then will use "100%"
        "sm" => 1, // This means "sm:col-span-1", if at "sm" are 2 columns available, then will use "1/2" 
        "md" => 1, // This means "md:col-span-1", if at "md" are 3 columns available, then will use "1/3"
        "lg" => 3, // This means "lg:col-span-3", if at "lg" are 6 columns available, then will use "1/2"
        "xl" => 3, // This means "xl:col-span-3", if at "xl" are 12 columns available, then will use "1/4"
        "2xl" => 3, // This means "2xl:col-span-3", if at "2xl" are 12 columns available, then will use "1/4"
    ]
]
```

How to deal simple as possible, create your own `X` class and define arrays to create custom cols configurations.

```php
namespace App\Nova\Grids;

class TwoColumns {
    public static array $GRID = [
        "default" => 1,
        "sm" => 2,
        "md" => 2,
        "lg" => 2,
        "xl" => 2,
        "2xl" => 2,
    ];

    public static array $FULL = [
        "default" => 1,
        "sm" => 2,
        "md" => 2,
        "lg" => 2,
        "xl" => 2,
        "2xl" => 2,
    ];

    public static array $HALF = [
        "default" => 1,
        "sm" => 1,
        "md" => 1,
        "lg" => 1,
        "xl" => 1,
        "2xl" => 1,
    ];
}
```

And after that, basically, use it on `gridder` like:

```php
use App\Nova\Grids\TwoColumns;

public static function fields()
{
    return [
        Panel::make(__('Details'), [
            Text::make(__('First Name'), 'first_name')
                ->withMeta([
                    "gridder" => [
                        "cols" => TwoColumns::$HALF,
                        "type" => "stack"
                    ]
                ]),

            Text::make(__('Last Name'), 'last_name')
                ->withMeta([
                    "gridder" => [
                        "cols" => TwoColumns::$HALF,
                        "type" => "stack"
                    ]
                ]),

            Text::make(__('Email Address'), 'email')
                ->withMeta([
                    "gridder" => [
                        "cols" => TwoColumns::$FULL,
                        "type" => "stack"
                    ]
                ]),
        ])->withMeta([
            "gridder" => [
                "cols" => TwoColumns::$GRID
            ]
        ])
    ]
}
```

What about the `stack`. You can choose if your field will be rendered as stack or in two columns (left label, right value).

# License

Consider this as unlicensed piece of code. Right? 

Use it for the purpose that you want, there are no private or public usage limitation, including commercial. 

Also, there are no need to include this license in any distribution. Feel free to clone, fork, improve, store and/or distribute.
