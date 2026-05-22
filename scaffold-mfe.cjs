const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, 'e2e', 'fixtures', 'mfe-test');
fs.mkdirSync(path.join(root, 'shell', 'src'), { recursive: true });
fs.mkdirSync(path.join(root, 'remote-cart', 'src'), { recursive: true });
fs.mkdirSync(path.join(root, 'remote-header', 'src'), { recursive: true });

// SHELL
fs.writeFileSync(path.join(root, 'shell', 'package.json'), JSON.stringify({name:"shell", version:"1.0.0", private:true, type:"module", dependencies:{react:"18.3.1","react-dom":"18.3.1"}, devDependencies:{sparx:"file:../../../.."}}));
fs.writeFileSync(path.join(root, 'shell', 'sparx.config.ts'), `import { defineConfig } from 'sparx'
export default defineConfig({
  framework: 'react',
  federation: {
    name: 'shell',
    remotes: {
      remote_cart: 'remote_cart@http://localhost:5174/remoteEntry.js',
      remote_header: 'remote_header@http://localhost:5175/remoteEntry.js',
    }
  }
})`);
fs.writeFileSync(path.join(root, 'shell', 'index.html'), `<!DOCTYPE html><html><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>`);
fs.writeFileSync(path.join(root, 'shell', 'src', 'main.tsx'), `import('./bootstrap')`);
fs.writeFileSync(path.join(root, 'shell', 'src', 'bootstrap.tsx'), `import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
createRoot(document.getElementById('root')!).render(<App/>);`);
fs.writeFileSync(path.join(root, 'shell', 'src', 'App.tsx'), `import React, { useState, Suspense } from 'react';
const CartWidget = React.lazy(() => import('remote_cart/CartWidget'));
const HeaderBar = React.lazy(() => import('remote_header/HeaderBar'));

export default function App() {
  const [cartCount, setCartCount] = useState(3);
  return (
    <div>
      <Suspense fallback="Loading Header...">
        <HeaderBar cartCount={cartCount} />
      </Suspense>
      <div style={{padding: 20}}>
        <h1>Sparx MFE Demo</h1>
        <Suspense fallback="Loading Cart...">
          <CartWidget onCartChange={setCartCount} />
        </Suspense>
      </div>
    </div>
  );
}`);

// REMOTE CART
fs.writeFileSync(path.join(root, 'remote-cart', 'package.json'), JSON.stringify({name:"remote-cart", version:"1.0.0", private:true, type:"module", dependencies:{react:"18.3.1","react-dom":"18.3.1"}, devDependencies:{sparx:"file:../../../.."}}));
fs.writeFileSync(path.join(root, 'remote-cart', 'sparx.config.ts'), `import { defineConfig } from 'sparx'
export default defineConfig({
  framework: 'react',
  port: 5174,
  federation: {
    name: 'remote_cart',
    exposes: {
      './CartWidget': './src/CartWidget.tsx'
    }
  }
})`);
fs.writeFileSync(path.join(root, 'remote-cart', 'index.html'), `<!DOCTYPE html><html><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>`);
fs.writeFileSync(path.join(root, 'remote-cart', 'src', 'main.tsx'), `import('./bootstrap')`);
fs.writeFileSync(path.join(root, 'remote-cart', 'src', 'bootstrap.tsx'), `import React from 'react';
import { createRoot } from 'react-dom/client';
import CartWidget from './CartWidget';
createRoot(document.getElementById('root')!).render(<CartWidget/>);`);
fs.writeFileSync(path.join(root, 'remote-cart', 'src', 'CartWidget.tsx'), `import React, { useState } from 'react';
export default function CartWidget({ onCartChange }) {
  const [items, setItems] = useState([
    { id: 1, name: 'Sparx Pro', price: 99, quantity: 1 },
    { id: 2, name: 'React Course', price: 49, quantity: 1 },
    { id: 3, name: 'Sticker Pack', price: 5, quantity: 2 }
  ]);
  
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const removeItem = (id) => {
    const newItems = items.filter(i => i.id !== id);
    setItems(newItems);
    if(onCartChange) onCartChange(newItems.reduce((sum, i) => sum + i.quantity, 0));
  };

  return (
    <div data-testid="cart-widget" style={{border: '1px solid #ccc', padding: 16, width: 300}}>
      <h2>Your Cart</h2>
      {items.map(item => (
        <div key={item.id} style={{display:'flex', justifyContent:'space-between', marginBottom: 8}}>
          <span>{item.name} (x{item.quantity})</span>
          <span>${item.price} <button onClick={() => removeItem(item.id)}>Remove</button></span>
        </div>
      ))}
      <hr/>
      <div style={{display:'flex', justifyContent:'space-between', fontWeight:'bold'}}>
        <span>Total:</span>
        <span>${total}</span>
      </div>
      <button style={{marginTop: 16, width: '100%', padding: 8, background: '#22c55e', color: 'white', border: 'none'}}>Checkout</button>
    </div>
  );
}`);

// REMOTE HEADER
fs.writeFileSync(path.join(root, 'remote-header', 'package.json'), JSON.stringify({name:"remote-header", version:"1.0.0", private:true, type:"module", dependencies:{react:"18.3.1","react-dom":"18.3.1"}, devDependencies:{sparx:"file:../../../.."}}));
fs.writeFileSync(path.join(root, 'remote-header', 'sparx.config.ts'), `import { defineConfig } from 'sparx'
export default defineConfig({
  framework: 'react',
  port: 5175,
  federation: {
    name: 'remote_header',
    exposes: {
      './HeaderBar': './src/HeaderBar.tsx'
    }
  }
})`);
fs.writeFileSync(path.join(root, 'remote-header', 'index.html'), `<!DOCTYPE html><html><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>`);
fs.writeFileSync(path.join(root, 'remote-header', 'src', 'main.tsx'), `import('./bootstrap')`);
fs.writeFileSync(path.join(root, 'remote-header', 'src', 'bootstrap.tsx'), `import React from 'react';
import { createRoot } from 'react-dom/client';
import HeaderBar from './HeaderBar';
createRoot(document.getElementById('root')!).render(<HeaderBar cartCount={3}/>);`);
fs.writeFileSync(path.join(root, 'remote-header', 'src', 'HeaderBar.tsx'), `import React from 'react';
export default function HeaderBar({ cartCount }) {
  return (
    <div data-testid="header-bar" style={{background: '#0a0a0b', color: 'white', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <h2 style={{margin: 0}}>Sparx Shop</h2>
      <nav>
        <span style={{marginRight: 16}}>Home</span>
        <span style={{marginRight: 16}}>Products</span>
        <span style={{background: '#eab308', color: 'black', padding: '4px 8px', borderRadius: 12}}>Cart ({cartCount})</span>
      </nav>
    </div>
  );
}`);

console.log("Scaffold complete.");
