import React from "react"
import { Button } from "../../Button"
import { SubscribeBlock } from "./Subscribe.styles"

export const Subscribe: React.FC = () => {
  return (
    <SubscribeBlock>
      <input placeholder="введите email для подписки НА выгодные акции" />
      <Button>подписаться</Button>
    </SubscribeBlock>
  )
}
