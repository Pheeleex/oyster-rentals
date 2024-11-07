// CarDetailsInfo.tsx
import { CarProps, CarSpecProps } from "@/types";
import PreOrderForm from "./Forms/PreOrderForm";

interface CarDetailsInfoProps {
    car?: CarSpecProps | CarProps | null;
    isCarProps: (car?: CarSpecProps | CarProps) => car is CarProps;
}

const PreOrderSection = ({ car, isCarProps }: CarDetailsInfoProps) => (
    <div className="flex-1 flex flex-col gap-2">
        <h2 className='font-semibold text-xl capitalize'>
            {car && isCarProps(car) ? `${car.make} ${car.model}` : 'Unknown Car'}
        </h2>

        {car ? (
            <div className="mt-3 flex flex-wrap gap-4">
                {Object.entries(car).map(([key, value]) => (
                    <div className='flex justify-between gap-5 w-full text-right' key={key}>
                        <h4 className='text-grey capitalize'>
                            {key.split("_").join(" ")}
                        </h4>
                        <p className='text-black-100 font-semibold'>
                            {value}
                        </p>
                    </div>
                ))}
            </div>
        ) : (
            <p>No car available. Please pre-order.</p>
        )}

        {!car ? (
            <PreOrderForm type='create' />
        ) : isCarProps(car) && (
            <PreOrderForm
                carManufacturer={car.make}
                carModel={car.model}
                year={car.year}
                carId={car.id}
                type='create'
            />
        )}
    </div>
);

export default PreOrderSection;
