import { Component, Show } from "solid-js"
import type { CardType } from "../App"
import styles from './Card.module.css'

export const Card: Component<{ onClick: (event: MouseEvent) => void, item: CardType }> = (props) => {
    console.log(styles)
    const classes = `
        card
        text-8xl grid place-content-center rounded-xl w-[120px] h-[120px] bg-white
        hover:bg-gray-100 cursor-pointer
        border border-gray-200 shadow-lg text-gray-400 font-extrabold
    `

    return (
        <Show when={props.item.flipped} fallback={
            <div onClick={props.onClick} class={classes}>?</div>
        }>
            <div class={classes}>
                {props.item.symbol}
            </div>
        </Show>
    )
}