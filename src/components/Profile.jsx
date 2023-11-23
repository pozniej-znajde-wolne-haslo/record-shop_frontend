import React, { useContext } from 'react';
import { MyContext } from '../context/context';

export default function Profile() {
  const { user } = useContext(MyContext);
  const { orders, setOrders } = useContext(MyContext);
  // useeffect, fetch?? here or in the context??
  // comps rendered overlays? (beg kurs trevor) ???

  return (
    <div>
      <h1>Nice to see you, {user.firstName}!</h1>
    </div>
  );
}
