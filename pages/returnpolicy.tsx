import { useTitle } from "@/context/titleContext";
import React, { useEffect } from "react"

export default function ReturnPolicy() {
  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle(`Return Policy | Fashio.pk`);
  }, []);

  return (
    <div className='w-full'>
      <h1 className='page-header'>Return Policy</h1>
      <h3 className="text-center">Policy is being updated Currently.</h3>
    </div>
  )
}