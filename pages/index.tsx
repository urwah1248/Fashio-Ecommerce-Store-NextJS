import Featured from '../components/Featured'
import { useEffect } from 'react';
import { useTitle } from '@/context/titleContext';

export default function Home() {
  const {changeTitle} = useTitle();

  useEffect(() => {
    changeTitle(`Home | Fashio.pk`)
  },[])

  return (
    <>
      <Featured />
    </>
  )
}
