import React, { SetStateAction, useState } from 'react'
import { useGlobalContext } from '../context/GlobalContext'

const useFormRegisterProduct = (formValues: FormProductValues, onValidate: (form: FormProductValues) => FormProductValues | null) => {
  const { addProduct } = useGlobalContext()
  const [form, setForm] = useState<FormProductValues>({})
  const [loading, setLoading] = useState()
  const [error, setError] = useState<FormProductValues | null>(null)


  const handleProductValues = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let err = onValidate(form)
    if (err === null) {
      // if (form) {
      addProduct(form)
      // }
    } else {
      setError(err)
    }
  }
  return { form, error, loading, handleProductValues, handleSubmit }
}

export default useFormRegisterProduct