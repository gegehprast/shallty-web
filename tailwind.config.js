/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const _ = require('lodash')
var flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette').default

module.exports = {
    purge: {
        enabled: process.env.NODE_ENV === 'production',
        content: ['./components/**/*.tsx', './pages/**/*.tsx'],
    },
    theme: {
        extend: {
            colors: {
                'sh-100': '#f63975',
                'sh-200': '#ff3172',
                'sh-300': '#ff0050',
            },
            fontFamily: {
                mono: ['Ubuntu', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
            },
            boxShadow: {
                'bs': '0 0px 15px 0px rgba(0, 0, 0, 0.20), 0 5px 10px 0px rgba(0, 0, 0, 0.20)',
            },
        },
    },
    variants: {
        backgroundColor: ['responsive', 'hover', 'focus', 'active'],
        textColor: ['responsive', 'hover', 'focus', 'visited'],
        borderWidth: ['responsive', 'hover', 'focus', 'active'],
        margin: ['responsive', 'hover', 'focus', 'active'],
    },
    plugins: [
        function ({
            addUtilities,
            e,
            theme,
            variants
        }) {
            const colors = flattenColorPalette(theme('borderColor'))

            const utilities = _.flatMap(_.omit(colors, 'default'), (value, modifier) => ({
                [`.${e(`border-t-${modifier}`)}`]: {
                    borderTopColor: `${value}`
                },
                [`.${e(`border-r-${modifier}`)}`]: {
                    borderRightColor: `${value}`
                },
                [`.${e(`border-b-${modifier}`)}`]: {
                    borderBottomColor: `${value}`
                },
                [`.${e(`border-l-${modifier}`)}`]: {
                    borderLeftColor: `${value}`
                },
            }))

            addUtilities(utilities, variants('borderColor'))
        }
    ],
    corePlugins: {
        textOpacity: false,
        borderOpacity: false,
    }
}
