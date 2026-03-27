export const getOrderFormConfig = (yup, values = {}, requiredFields = []) => ({
  fullAddress: {
    value: values.address?.fullAddress || '',
    validation: yup?.string().max(300).required(),
  },
  email: {
    value: values.email || '',
    validation: requiredFields.includes('email')
      ? yup?.string().email().max(100).required()
      : yup?.string().email().max(100),
  },
  name: {
    value: values.name || '',
    validation: requiredFields.includes('name')
      ? yup?.string().max(100).required()
      : yup?.string().max(100),
  },
  surname: {
    value: values.surname || '',
    validation: requiredFields.includes('surname')
      ? yup?.string().max(100).required()
      : yup?.string().max(100),
  },
  phone: {
    value: values.phone || '',
    validation: requiredFields.includes('phone')
      ? yup?.string().max(100).required()
      : yup?.string().max(100),
  },
  type: {
    value: values.type || null,
    validation: yup?.string().nullable().required(),
  },
  stage: {
    value: values.stage || null,
    validation: yup?.string().nullable().required(),
  },
  code: {
    value: values.address?.code ?? '',
    validation: yup?.string(),
  },
  city: {
    value: values.address?.city ?? '',
    validation: yup?.string().required(),
  },
  street: {
    value: values.address?.street ?? '',
    validation: yup?.string(),
  },
  lat: {
    value: values.address?.lat ?? '',
    validation: yup?.string().required(),
  },
  lng: {
    value: values.address?.lng ?? '',
    validation: yup?.string().required(),
  },
  house: {
    value: values.address?.house ?? '',
    validation: yup?.string(),
  },
  flat: {
    value: values.address?.flat ?? '',
    validation: yup?.string(),
  },
  assignedEmployee: {
    value: values.assignedEmployee?._id || null,
  },
  startDate: {
    value: values.startDate,
  },
  endDate: {
    value: values.endDate,
  },
  employeeMessage: {
    value: values.employeeMessage || '',
    validation: yup?.string().max(5000),
  },
  managerMessage: {
    value: values.managerMessage || '',
    validation: yup?.string().max(5000),
  },
  employeeNotes: {
    value: values.employeeNotes || '',
    validation: yup?.string().max(5000),
  },
  files: {
    value: values.files || [],
  },
  priority: {
    value: values.priority || 1,
  },
});
