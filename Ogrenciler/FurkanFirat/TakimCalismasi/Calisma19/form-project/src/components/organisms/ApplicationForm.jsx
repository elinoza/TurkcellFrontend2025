import { useFormik } from 'formik';
import { Button } from '../atoms/Button';
import { applicationFormFields } from '../../constants/formFields';
import { applicationFormSchema } from '../../schemas';
import ApplicationFormField from '../molecules/ApplicationFormField';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';
export const ApplicationForm = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
  } = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: currentUser.email || '',
      phone: '',
      country: '',
      city: '',
      address: '',
      desiredPosition: '',
      additionalInfo: '',
      status: 'pending',
    },
    validationSchema: applicationFormSchema,
    onSubmit: async (values) => {
      await addDoc(collection(db, 'applications'), {
        ...values,
        timestamp: serverTimestamp(),
      });
      alert('Form submitted.');
      navigate('/');
    },
  });

  return (
    <form className='row g-3' onSubmit={handleSubmit}>
      {applicationFormFields.map((field) => (
        <ApplicationFormField
          key={field.id}
          field={field}
          touched={touched}
          errors={errors}
          handleChange={handleChange}
          handleBlur={handleBlur}
          values={values}
        />
      ))}

      <div className='d-flex justify-content-end gap-2'>
        <Button
          type='button'
          className='btn btn-secondary'
          onClick={handleReset}
        >
          Reset
        </Button>
        <Button type='submit' className='btn btn-primary'>
          Submit
        </Button>
      </div>
    </form>
  );
};
