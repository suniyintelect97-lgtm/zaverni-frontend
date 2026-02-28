import React, { useState } from 'react'

const menu = [
  { id:1, name:'Красная', price:420 },
  { id:2, name:'Жёлтая', price:390 },
  { id:3, name:'Чёрная', price:490 },
  { id:4, name:'Зелёная', price:370 }
]

const drinks = [
  { id:1, name:'Coca-Cola 0.5', price:120 },
  { id:2, name:'Fanta 0.5', price:120 },
  { id:3, name:'Sprite 0.5', price:120 },
  { id:4, name:'Вода 0.5', price:90 }
]

export default function App(){
  const [cart,setCart]=useState([])
  const [name,setName]=useState('')
  const [phone,setPhone]=useState('')

  const addToCart=(item)=>setCart([...cart,item])
  const total=cart.reduce((a,b)=>a+b.price,0)

  const handlePay=async()=>{
    const res=await fetch('http://localhost:3001/create-payment',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({cart,name,phone})
    })
    const data=await res.json()
    window.location.href=data.confirmation.confirmation_url
  }

  return(
    <div style={{color:'white',padding:'20px'}}>
      <h1 style={{color:'orange'}}>ЗАВЕРНИ</h1>
      <p>Санкт-Петербург, ул. Невская 72</p>

      <h2>Меню</h2>
      {menu.map(i=>(
        <div key={i.id} style={{margin:'10px 0'}}>
          {i.name} — {i.price} ₽
          <button onClick={()=>addToCart(i)} style={{marginLeft:'10px'}}>+</button>
        </div>
      ))}

      <h2>Напитки</h2>
      {drinks.map(i=>(
        <div key={i.id}>
          {i.name} — {i.price} ₽
          <button onClick={()=>addToCart(i)} style={{marginLeft:'10px'}}>+</button>
        </div>
      ))}

      <h2>Корзина</h2>
      {cart.map((c,i)=>(<div key={i}>{c.name} — {c.price} ₽</div>))}
      <p>Итого: {total} ₽</p>

      <input placeholder="Имя" value={name} onChange={e=>setName(e.target.value)} /><br/>
      <input placeholder="Телефон" value={phone} onChange={e=>setPhone(e.target.value)} /><br/>

      <button onClick={handlePay} style={{marginTop:'10px',padding:'10px',background:'green',color:'white'}}>
        Оплатить онлайн
      </button>
    </div>
  )
}