import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import Spinner from '@/components/shared/icons/Spinner';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { createUserSubscription } from '@/lib/services/admin/manageUserService';
import { LoginUserRequest } from '@/boundary/interfaces/auth';
import { CreateUserSubscriptionRequest } from '@/boundary/interfaces/admin';
import { validateLoginFormInputErrors, validateSubscriptionFormInputErrors } from '@/helpers/validationHelpers';

export default function CreateUserSubscriptionModal({createRequest, isOpen, onClose}: {
  createRequest: CreateUserSubscriptionRequest,
  isOpen: boolean,
  onClose: () => void
}) {
  const [createSubscriptionFormData, setCreateSubscriptionFormData] = useState(createRequest);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inputErrors, setInputErrors] = useState({
    customerEmail: '', customerId: ''
  });

  const handleChange = (e: any) => {
    const {name, value} = e.target;
    setCreateSubscriptionFormData({...createSubscriptionFormData, [name]: value});
  }

  const createSubscription = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    const inputErrors = validateSubscriptionFormInputErrors(createSubscriptionFormData);

    if (inputErrors && Object.keys(inputErrors).length > 0) {
      setInputErrors(inputErrors);
      setIsSubmitting(false);
      return;
    }

    const response = await createUserSubscription(createSubscriptionFormData);
    if (response.statusCode === 200) {
      toast.success(response.message ?? "User subscription created successfully")
      setIsSubmitting(false);
      onClose()
    } else {
      setIsSubmitting(false);
      toast.error(response.message ?? "Unknown error occurred")
    }
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={() => {
          onClose();
        }}
        onClose={onClose}
        size="sm"
        placement="center"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Create User Subscription</ModalHeader>
              <ModalBody>
                <form onSubmit={createSubscription}>
                  <div className="flex flex-wrap md:flex-nowrap gap-4 m-2">
                    <Input type="text"
                           color="default"
                           onChange={handleChange}
                           value={createSubscriptionFormData.customerEmail}
                           label="Customer Email"
                           disabled={true}
                           name="customerEmail"
                           variant={"bordered"}
                           placeholder="Enter customer email"
                           onInput={() => {
                             setInputErrors({...inputErrors, customerEmail: ""});
                           }}
                           isInvalid={inputErrors.customerEmail !== ""}
                           errorMessage={inputErrors.customerEmail}/>
                  </div>

                  <div className="flex flex-wrap md:flex-nowrap gap-4 m-2">
                    <Input type="text"
                           color="default"
                           onChange={handleChange}
                           value={createSubscriptionFormData.customerId}
                           label="Customer Id"
                           name="customerId"
                           variant={"bordered"}
                           placeholder="Enter customer id"
                           onInput={() => {
                             setInputErrors({...inputErrors, customerId: ""});
                           }}
                           isInvalid={inputErrors.customerId !== ""}
                           errorMessage={inputErrors.customerId}/>
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  No
                </Button>
                <Button color="danger"
                        type="submit"
                        isLoading={isSubmitting}
                        spinner={<Spinner/>}
                        onClick={createSubscription}>
                  Add Subscription
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}