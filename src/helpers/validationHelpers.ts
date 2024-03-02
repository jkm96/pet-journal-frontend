import { LoginUserRequest, RegisterUserRequest } from '@/boundary/interfaces/auth';
import { CreatePetRequest, EditPetRequest } from '@/boundary/interfaces/pet';
import { CreateJournalEntryRequest, UpdateJournalEntryRequest } from '@/boundary/interfaces/journal';
import { CreateMagicProjectRequest } from '@/boundary/interfaces/magicStudio';
import { CreateUserSubscriptionRequest } from '@/boundary/interfaces/admin';

export function isEmailValid(email: string): boolean {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}

export function validateRegisterFormInputErrors(formData: RegisterUserRequest) {
  const errors: RegisterUserRequest = {
    email: '', username: '', password: '', confirmPassword: '',
  };

  if (formData.email.trim() === '') {
    errors.email = 'Email cannot be empty';
  } else if (!isEmailValid(formData.email.trim())) {
    errors.email = 'Invalid email address';
  }

  if (formData.username.trim() === '') {
    errors.username = 'Username cannot be empty';
  } else if (formData.username.trim().length < 4) {
    errors.username = 'Username must be at least 4 characters long';
  }

  if (formData.password.trim() === '') {
    errors.password = 'Password cannot be empty';
  } else if (formData.password.trim().length < 6) {
    errors.password = 'Password must be at least 6 characters long';
  }

  if (formData.confirmPassword.trim() === '') {
    errors.confirmPassword = 'Confirm password cannot be empty';
  } else if (formData.confirmPassword.trim().length < 6) {
    errors.confirmPassword = 'Confirm password must be at least 6 characters long';
  } else if (formData.confirmPassword.trim() !== formData.password.trim()) {
    errors.confirmPassword = 'Passwords do not match';
  }

  // Check if there are any errors and return null if all input is valid
  for (const key in errors) {
    if (errors[key as keyof RegisterUserRequest] !== '') {
      return errors;
    }
  }

  return null;
}

export function validateLoginFormInputErrors(formData: LoginUserRequest) {
  const errors: LoginUserRequest = {
    username: '', password: '',
  };

  if (formData.username.trim() === '') {
    errors.username = 'Username cannot be empty';
  }

  if (formData.password.trim() === '') {
    errors.password = 'Password cannot be empty';
  }

  for (const key in errors) {
    if (errors[key as keyof LoginUserRequest] !== '') {
      return errors;
    }
  }

  return null;
}

export function validateSubscriptionFormInputErrors(formData: CreateUserSubscriptionRequest) {
  const errors: CreateUserSubscriptionRequest = {
    customerEmail: '', customerId: '',
  };

  if (formData.customerId.trim() === '') {
    errors.customerId = 'Customer Id cannot be empty';
  }

  for (const key in errors) {
    if (key !== 'customerEmail' && errors[key as keyof CreateUserSubscriptionRequest] !== '') {
      return errors;
    }
  }

  return null;
}

export function validateCreateProjectFormInputErrors(formData: CreateMagicProjectRequest) {
  const errors: CreateMagicProjectRequest = {
    pdf_content: '',
    periodFrom: '', periodTo: '', title: '',
  };

  if (formData.title.trim() === '') {
    errors.title = 'Title cannot be empty';
  }

  for (const key in errors) {
    if (key !== 'content' && key !== 'periodTo' && key !== 'periodTo' && errors[key as keyof CreateMagicProjectRequest] !== '') {
      return errors;
    }
  }

  return null;
}

export function validateCreatePetFormInputErrors(formData: CreatePetRequest) {
  const errors: CreatePetRequest = {
    breed: '',
    dateOfBirth: '',
    description: '',
    name: '',
    nickname: '',
    petTraits: null,
    profilePicture: null,
    species: '',
  };

  validateCreateEditPetRequests(formData, errors);

  // Check if there are any errors and return null if all input is valid
  for (const key in errors) {
    if (key !== 'petTraits' && key !== 'profilePicture' && errors[key as keyof CreatePetRequest] !== '') {
      return errors;
    }
  }

  return null;
}

function validateCreateEditPetRequests(formData: EditPetRequest | CreatePetRequest, errors: EditPetRequest | CreatePetRequest) {
  if (formData.name.trim() === '') {
    errors.name = 'Name cannot be empty';
  } else if (formData.name.trim().length < 3) {
    errors.name = 'Name must be at least 3 characters long';
  }

  if (formData.species.trim() === '') {
    errors.species = 'Species cannot be empty';
  }

  if (formData.description.trim() === '') {
    errors.description = 'Description cannot be empty';
  } else if (formData.description.trim().length < 20) {
    errors.description = 'Description must be at least 20 characters long';
  }

  if (formData.nickname !== null && formData.nickname?.trim().length < 3) {
    errors.nickname = 'Nick name must be at least 3 characters long';
  }

  if (formData.breed !== null && formData.breed?.trim().length < 3) {
    errors.breed = 'Breed must be at least 3 characters long';
  }
}

export function validateEditPetFormInputErrors(formData: EditPetRequest) {
  const errors: EditPetRequest = {
    petId: 0,
    breed: '',
    dateOfBirth: '',
    description: '',
    name: '',
    nickname: '',
    species: '',
  };

  validateCreateEditPetRequests(formData, errors);

  // Check if there are any errors and return null if all input is valid
  for (const key in errors) {
    if (errors[key as keyof EditPetRequest] !== '') {
      return errors;
    }
  }

  return null;
}

export function validateCreateJournalFormInputErrors(formData: CreateJournalEntryRequest) {
  const errors: CreateJournalEntryRequest = {
    attachments: null, content: '', event: '', location: '', mood: '', petIds: [], tags: '', title: '',
  };

  if (formData.title.trim() === '') {
    errors.title = 'title cannot be empty';
  } else if (formData.title.trim().length < 8) {
    errors.title = 'title must be at least 8 characters long';
  }

  if (formData.content.trim() === '') {
    errors.content = 'description cannot be empty';
  } else if (formData.content.trim().length < 20) {
    errors.content = 'description must be at least 20 characters long';
  }

  // Check if there are any errors and return null if all input is valid
  for (const key in errors) {
    if (key !== 'petIds' && key !== 'attachments' && errors[key as keyof CreateJournalEntryRequest] !== '') {
      return errors;
    }
  }

  return null;
}


export function validateEditJournalFormInputErrors(formData: UpdateJournalEntryRequest) {
  const errors: UpdateJournalEntryRequest = {
    journalId: 0, petIds: [], content: '', event: '', location: '', mood: '', tags: '', title: '',
  };

  if (formData.title.trim() === '') {
    errors.title = 'Title cannot be empty';
  } else if (formData.title.trim().length < 8) {
    errors.title = 'Title must be at least 8 characters long';
  }

  if (formData.content.trim() === '') {
    errors.content = 'description cannot be empty';
  } else if (formData.content.trim().length < 20) {
    errors.content = 'description must be at least 20 characters long';
  }

  // Check if there are any errors and return null if all input is valid
  for (const key in errors) {
    if (key !== 'petIds' && key !== 'journalId' && errors[key as keyof UpdateJournalEntryRequest] !== '') {
      return errors;
    }
  }

  return null;
}

export function areFilesValid(files: FileList | null) {
  const allowedFileTypes = ['image/png', 'image/jpeg'];
  if (files && files.length > 0) {
    const invalidFiles = Array.from(files).filter((file) => !allowedFileTypes.includes(file.type));
    return invalidFiles.length <= 0;
  }
};