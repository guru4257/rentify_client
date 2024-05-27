import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Contact({ listing, senderEmail, senderName }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState('');
  const onChange = (e) => {
    setMessage(e.target.value);
  };
  
  const base_url = import.meta.env.VITE_SERVER_URL

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(base_url+`/api/user/getDetails/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  const sendEmail = async()=>{
    
    const mailDetail = {

      buyerEmail : senderEmail,
      buyerName  : senderName,
      sellerEmail : landlord.email,
      propertyName : listing.name,
      message : message
    }
    const res = await fetch(base_url+'/api/user/sendEmail/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mailDetail),
    });

    const data = await res.json()
    if(data.success){
      window.alert(data.message)
      setMessage('')
    }else{
      window.alert("Something went wrong, Please try again later...!")
    }
  }

  return (
    <>
      {landlord && (
        <div className='flex flex-col gap-2'>
          <p>
            Contact <span className='font-semibold'>{landlord.username}</span>{' '}
            for{' '}
            <span className='font-semibold'>{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name='message'
            id='message'
            rows='2'
            value={message}
            onChange={onChange}
            placeholder='Enter your message here...'
            className='w-full border p-3 rounded-lg'
          ></textarea>

          <Link
          onClick={sendEmail}
          className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
          >
            Send Message          
          </Link>
        </div>
      )}
    </>
  );
}
