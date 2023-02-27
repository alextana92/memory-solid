import { Component, createSignal, Show } from 'solid-js';
import { createStore, produce } from 'solid-js/store';
import { Card } from './components/Card';
import { onMount, For } from 'solid-js'

export interface CardType {
  id: number,
  symbol: string,
  flipped: boolean,
}

const App: Component = () => {
  const [cards, setCards] = createStore<CardType[]>([])
  const [currentlyFlipped, setCurrentlyFlipped] = createSignal<CardType[]>([])
  const [winningState, setWinningState] = createSignal<Boolean>(false)

  const initialCards = [
    { id: 1, symbol: '👻', flipped: false },
    { id: 2, symbol: '🐬', flipped: false },
    { id: 3, symbol: '🦧', flipped: false },
    { id: 4, symbol: '🐙', flipped: false },
    { id: 5, symbol: '🐠', flipped: false },
    { id: 6, symbol: '🦄', flipped: false },
    { id: 7, symbol: '👻', flipped: false },
    { id: 8, symbol: '🐬', flipped: false },
    { id: 9, symbol: '🦧', flipped: false },
    { id: 10, symbol: '🐙', flipped: false },
    { id: 11, symbol: '🐠', flipped: false },
    { id: 12, symbol: '🦄', flipped: false },
  ]

  onMount(() => {
    const shuffled = [...initialCards
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)]

    setCards(shuffled)
  })

  function handleClick(item: CardType) {
    if (currentlyFlipped().length === 2) {
      return
    }

    if (item.flipped) {
      return
    }

    if (currentlyFlipped().length === 1) {
      flipCard(item)

      if (item.symbol === currentlyFlipped()[0].symbol) {
        setTimeout(() => {
          setCurrentlyFlipped([])

          const flipped = cards.filter(f => f.flipped).length

          if (flipped === cards.length) {
            setWinningState(true)
          }
        }, 800);

        return
      }

      setTimeout(() => {
        flipCard(item)
        flipCard(currentlyFlipped()[0])
        setCurrentlyFlipped([])
      }, 800);

      return
    }

    // if you get to this point you'll flip a card anyway
    flipCard(item)
    setCurrentlyFlipped(f => [...f, item])
  }

  function flipCard(item: CardType) {
    setCards(produce((cards) => {
      const currentArr = [...cards]
      const i = currentArr.findIndex(f => f.id === item.id)

      currentArr[i].flipped = !currentArr[i].flipped
    }))
  }

  return (
    <div class="container mx-auto text-center my-8">
      <h1 class="text-6xl font-extrabold tracking-tighter mb-8">Solid js memory game</h1>
      <div class="grid-container mx-auto w-max gap-6 grid grid-cols-3">
        <For each={cards} fallback={<div>loading...</div>}>
          {(item) => <Card onClick={() => handleClick(item)} item={item} />}
        </For>

        <Show when={winningState()}>
          <div>You won</div>
        </Show>
      </div>
    </div>
  );
};

export default App;
