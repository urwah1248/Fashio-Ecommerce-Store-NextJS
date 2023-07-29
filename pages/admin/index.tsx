import React, {useEffect} from 'react'
import { useRouter } from 'next/router'

type Props = {}

const index = (props: Props) => {
    const router = useRouter();

    useEffect(() => {
        router.replace("/admin/login")
    }, [])

  return (
    <div>index</div>
  )
}

export default index