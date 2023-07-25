
export const onValidate = (form:FormProductValues) => {
  let isError = false;
  let errors:FormProductValues = {}
  if(!form.code?.trim()){
    errors.code = 'el campo codigo de barra es necesario';
    isError = true
  }
  if(!form.brand?.trim()){
    errors.brand = 'el campo marca es necesario';
    isError = true
  }
  if(!form.category?.trim()){
    errors.category = 'el campo categoria es necesario';
    isError = true
  }
  if(!form.description?.trim()){
    errors.description = 'el campo descripcion es necesario';
    isError = true
  }
  if(!form.price?.trim()){
    errors.price = 'el campo precio es necesario';
    isError = true
  }
  return isError ? errors : null
}