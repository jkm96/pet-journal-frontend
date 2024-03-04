import { Footer } from '@/components/site/sections/Footer';
import React, { useEffect, useState } from 'react';
import { Textarea } from '@nextui-org/input';
import { Input } from '@nextui-org/react';
import Spinner from '@/components/shared/icons/Spinner';
import { Button } from '@nextui-org/button';
import { LoginUserRequest } from '@/boundary/interfaces/auth';
import { CustomerFeedbackRequest } from '@/boundary/interfaces/siteContent';
import { validateFeedbackFormInputErrors, validateLoginFormInputErrors } from '@/helpers/validationHelpers';
import { loginUser } from '@/lib/services/auth/userAuthService';
import { toast } from 'react-toastify';
import { AccessTokenModel } from '@/boundary/interfaces/token';
import { giveFeedbackAsync } from '@/lib/services/sitecontent/siteContentService';
import { useAuth } from '@/hooks/useAuth';
import MainNavbar from '@/components/site/sections/MainNavbar';

const initialFormState: CustomerFeedbackRequest = {
  rating: 4, email: '', feedback: '',
};

export function CustomerFeedback() {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackFormData, setFeedbackFormData] = useState(initialFormState);
  const [inputErrors, setInputErrors] = useState({
    email: '', feedback: '', rating: 0,
  });

  useEffect(() => {
    if (user) {
      const request: CustomerFeedbackRequest = {
        email: user.email, feedback: '', rating: 4,
      };
      setFeedbackFormData(request);
    }
  }, [user]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFeedbackFormData({ ...feedbackFormData, [name]: value });
  };

  const [rating, setRating] = useState(0);

  const handleClick = (e: any, value: any) => {
    e.preventDefault();
    setRating(value);
    const updatedFormData = { ...feedbackFormData, rating: value };
    setFeedbackFormData(updatedFormData);
  };

  const handleFeedbackSubmit = async (event: any) => {
    event.preventDefault();
    setIsSubmitting(true);

    const inputErrors = validateFeedbackFormInputErrors(feedbackFormData);

    if (inputErrors && Object.keys(inputErrors).length > 0) {
      setInputErrors(inputErrors);
      setIsSubmitting(false);
      return;
    }

    let response = await giveFeedbackAsync(feedbackFormData);
    if (response.statusCode === 200) {
      toast.success(response.message);
      setIsSubmitting(false);
      setFeedbackFormData(initialFormState);
    } else {
      setIsSubmitting(false);
      toast.error(response.message ?? 'Unknown error occurred');
    }
  };

  return (
    <>
      <MainNavbar />

      <section className='bg-gray-50 relative pb-4'>
          <div className='mx-auto max-w-5xl md:px-4'>
            <div className='container mx-auto flex flex-col md:flex-row my-6 md:my-24'>
              <div className='flex flex-col w-full lg:w-1/3 md:p-8 lg:mb-0 mt-3'>
                <p className='text-black-2 text-lg uppercase tracking-loose'>REVIEW</p>
                <p className='text-3xl text-black-2 md:text-5xl my-4 leading-relaxed md:leading-snug'>Leave us a
                  feedback!</p>
                <p className='text-sm md:text-base text-black-2 text-opacity-100'>
                  Please provide your valuable feedback. It will help <span className="text-column-500 font-bold">improve our services</span> and <span className="text-column-500 font-bold">serve you better</span>.
                </p>
              </div>
              <div className='flex flex-col lg:w-2/3 justify-center'>
                <div className='flex flex-wrap justify-center w-full md:px-4'>
                  <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white'>
                    <div className='flex-auto p-5 lg:p-10'>
                      <h4 className='text-2xl mb-4 text-black text-center font-semibold'>Have a suggestion?</h4>
                      <form onSubmit={handleFeedbackSubmit}>

                        <Input type='text'
                               color='default'
                               onChange={handleChange}
                               value={feedbackFormData.email}
                               label='Email'
                               labelPlacement='outside'
                               name='email'
                               variant={'bordered'}
                               placeholder='Enter your email'
                               onInput={() => {
                                 setInputErrors({ ...inputErrors, email: '' });
                               }}
                               isInvalid={inputErrors.email !== ''}
                               errorMessage={inputErrors.email}
                        />

                        <h4 className='mt-2 text-black-2'>Rating</h4>
                        <div className='flex items-center w-full mb-2'>
                          {[...Array(5)].map((_, index) => (
                            <button
                              key={index}
                              className={`text-4xl ${index < rating ? 'text-success' : 'text-gray-400'} focus:outline-none`}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleClick(e, index + 1);
                              }}
                            >
                              &#9733;
                            </button>
                          ))}
                        </div>

                        <Textarea
                          variant='bordered'
                          onChange={handleChange}
                          value={feedbackFormData.feedback}
                          name='feedback'
                          label='Description'
                          labelPlacement='outside'
                          placeholder='Enter your description'
                          onInput={() => {
                            setInputErrors({ ...inputErrors, feedback: '' });
                          }}
                          isInvalid={inputErrors.feedback !== ''}
                          errorMessage={inputErrors.feedback}
                        />

                        <div className='flex justify-center items-center'>
                          <Button
                            type='submit'
                            value='Submit'
                            isLoading={isSubmitting}
                            spinner={<Spinner />}
                            className='w-1/2 mt-4.5 cursor-pointer rounded-lg border border-primary bg-success p-4 text-white transition hover:bg-opacity-90'
                          >
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </section>

      <Footer />;
    </>
  )
    ;
}