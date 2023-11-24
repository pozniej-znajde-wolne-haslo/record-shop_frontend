// THUMBNAIL - URL, string format, not actual IMG, NOT a file !!
// u can also store IMGs and make ur own links (above way - if server deletes an IMG, it's gone)

import React, { useContext, useEffect } from 'react';
import { MyContext } from '../context/context';
import toast, { Toaster } from 'react-hot-toast';

export default function Records() {
  // using context
  const { records, setRecords } = useContext(MyContext);
  const { user } = useContext(MyContext);

  // greet MSG, when USER logged in && redirected to this page:
  const greet = () => toast(`Hello, ${user.firstName}!`, { icon: '🐙' });

  // onload (u use it to get data, when the page is loading (mounting))
  useEffect(() => {
    // http://localhost:8000/api/records/allrecords
    fetch('https://shop-be-b5xf.onrender.com/api/records/allrecords')
      .then((res) => res.json())
      .then((result) => {
        setRecords(result.data); // 'cos RECORDS is now OBJ with ARR inside (KEYS: success & data)
        if (user) {
          greet();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>Records</h1>
      <Toaster position='top-center' />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {records.map((product) => {
          return (
            <div
              key={product._id}
              style={{
                width: '300px',
                boxShadow: '1px 1px 3px gray',
              }}
            >
              <h2>{product.title}</h2>
              <img src={product.thumbnail} width={200} alt='' />
              <p>{product.description}</p>
              <h2>${product.price}</h2>
              <button>add to cart</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
