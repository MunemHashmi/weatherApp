"use-client"

import { useRouter } from "@/node_modules/next/navigation";
import { Country, City } from 'country-state-city';
import { useState } from 'react';
import Select from 'react-select';
import { GlobeIcon } from '@heroicons/react/solid';

interface Value {
  latitude: string;
  longitude: string;
  isoCode: string;
}

interface Option {
  value: Value | null;
  label: string;
}

interface CityValue {
  latitude: string;
  longitude: string;
  countryCode: string;
  name: string;
  stateCode: string;
}

interface CityOption {
  value: CityValue | null;
  label: string;
}

const options = Country.getAllCountries().map((country) => ({
  value: {
    latitude: country.latitude,
    longitude: country.longitude,
    isoCode: country.isoCode,
  },
  label: country.name,
}));

function CityPicker() {
  const [selectedCountry, setSelectedCountry] = useState<Option | null>(null);
  const [selectedCity, setSelectedCity] = useState<CityOption | null>(null);
  const router = useRouter();

  const handleSelectedCountry = (option: Option | null) => {
    setSelectedCountry(option);
    setSelectedCity(null);
  };

  const handleSelectedCity = (option: CityOption | null) => {
    setSelectedCity(option);
    if (option && option.value) {
      router.push(`/location/${option.value.name}/${option.value.latitude}/${option.value.longitude}`);
    }
  };

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <div className = "flex items-center space-x-2 text-white/80">
                    <GlobeIcon className = "h-5 w-5 text-white" />
                    <label htmlFor="country">Country</label>
                </div>
                <Select
                    className = "text-black" 
                    value ={selectedCountry}
                    onChange ={handleSelectedCountry}
                options={options} />
            </div>
            {selectedCountry && (
            <div className="space-y-2">
                <div className = "flex items-center space-x-2 text-white/80">
                    <GlobeIcon className = "h-5 w-5 text-white" />
                    <label htmlFor="city">City</label>
                </div>
                <Select
                    className="text-black"
                    value={selectedCity}
                    onChange={handleSelectedCity}
                    options={
                    City.getCitiesOfCountry(selectedCountry.value.isoCode).map((city) => ({
                        value: {
                        latitude: city.latitude,
                        longitude: city.longitude,
                        countryCode: city.countryCode,
                        name: city.name,
                        stateCode: city.stateCode,
                        },
                        label: city.name,
                    })) || []
                    }
                />
            </div>
            )}
        </div>
    );   
}

export default CityPicker;