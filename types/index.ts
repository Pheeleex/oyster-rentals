import { Dispatch, MouseEventHandler, SetStateAction } from "react";

export type Status = "pending" | "confirm" | "cancelled";

export interface CustomButtonProps{
    title: string;
    containerStyles?: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
    btnType: "button" | "submit";
    textStyles?: string;
    rightIcon?: string
    isDisabled?: boolean
    isLoading?: boolean
}

export interface OptionProps{
  title: string;
  value: string
}

export interface SearchParamProps {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export interface OrderSearchProps{
  searchParams: PreOrderProps
}

export interface TestDriveProps{
  name?: string;
  phone?:string;
  email?: string;
  schedule?: Date
  carId?: string
  carModel?: string,
  carManufacturer?: string,
  TestDriveId?: string
  createdAt?: Date
  bookingSchedule?: Date | null
  status: Status
  notes?: string
  car?: CarSpecProps
}

export interface PreOrderProps{
  name?: string;
  phone?:string;
  email?: string;
  carManufacturer?: string;
  carModel?: string;
  trim?: string;
  year?: string;
  method?: 'Yes' | 'No';
  link?: string;
  orderId?: string
  carId?: string
  userId?: string
  status?: Status
  notes?: string
}

export interface moreProps{
  totalCount: number;
  scheduledCount: number;
  pendingCount: number;
  cancelledCount: number;
documents: PreOrderProps
}

export interface AppointmentProps{
  id: string;
  appointmentId?: string;
  schedule: Date;
  reason: string;
  createdAt?: Date
  status?: Status
  userName?: string
}

export interface CustomFilterProps{
    title: string;
    options: OptionProps[]
}

export interface SearchManuFacturerProps {
    manufacturer: string;
    setManuFacturer: (manufacturer: string) => void;
  }

  export interface CarProps{
    "city_mpg": number,
    "class": string,
    "combination_mpg": number,
    "cylinders": number,
    "displacement": number,
    "drive": string,
    "fuel_type": string,
    "highway_mpg": number,
    "make": string,
    "model": string,
    "transmission": string,
    "year": number
    id: string,
  }

  export interface ShowMoreProps {
    pageNumber: number;
    isNext: boolean;
  }

  export interface FilterProps{
    manufacturer: string,
    limit: number,
    model: string,
    year: number,
    fuel: string
  }

  export interface HomeProps {
    searchParams: FilterProps;
  }

  export interface CarSpecProps {
    Drive: string,
    FuelType: string,
    Make: string,
    Model: string,
    Transmission: String
    ImagePath?: string
    id: string;
    images?: string[];
    imageFiles?: File []
  }

  export type SetCars = Dispatch<SetStateAction<CarSpecProps[]>>
  export type SetTestDrive = Dispatch<SetStateAction<TestDriveProps[]>>