import { InlineNotification } from '@/components';

export default function App() {
  return (
    <main>
      <InlineNotification variant="info">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea molestias
        quos voluptatem qui, voluptate at laborum culpa assumenda soluta porro
        et commodi, aliquid quas voluptatibus unde, excepturi facere
        consequatur! Unde.
      </InlineNotification>
      <br />
      <InlineNotification variant="success">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea molestias
        quos voluptatem qui, voluptate at laborum culpa assumenda soluta porro
        et commodi, aliquid quas voluptatibus unde, excepturi facere
        consequatur! Unde.
      </InlineNotification>
      <br />
      <InlineNotification variant="warning">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea molestias
        quos voluptatem qui, voluptate at laborum culpa assumenda soluta porro
        et commodi, aliquid quas voluptatibus unde, excepturi facere
        consequatur! Unde.
      </InlineNotification>
      <br />
      <InlineNotification variant="danger">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea molestias
        quos voluptatem qui, voluptate at laborum culpa assumenda soluta porro
        et commodi, aliquid quas voluptatibus unde, excepturi facere
        consequatur! Unde.
      </InlineNotification>
      <br />
    </main>
  );
}
