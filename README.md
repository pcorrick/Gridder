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

# License

Consider this as unlicensed piece of code. Right? 

Use it for the purpose that you want, there are no private or public usage limitation, including commercial. 

Also, there are no need to include this license in any distribution. Feel free to clone, fork, improve, store and/or distribute.
