// import {
//   createContext,
//   FC,
//   ReactNode,
//   useCallback,
//   useEffect,
//   useMemo,
//   useState,
// } from "react";

// interface CarContextProps {
//   cars: Car[];
//   addCar: (car: Car) => void;
//   updateCar: (id: string, updatedCar: Partial<Car>) => void;
//   deleteCar: (id: string) => void;
//   getCars: () => void;
//   getLoading: boolean;
//   updateLoading: boolean;
//   deleteLoading: boolean;
//   addLoading: boolean;
// }

// const LOCAL_STORAGE_KEY = "cars";

// export const CarContext = createContext<CarContextProps | undefined>(undefined);

// export const CarProvider: FC<{ children: ReactNode }> = ({ children }) => {
//   const [cars, setCars] = useState<Car[]>([]);
//   const [getLoading, setGetLoading] = useState(false);
//   const [deleteLoading, setDeleteLoading] = useState(false);
//   const [updateLoading, setUpdateLoading] = useState(false);
//   const [addLoading, setAddLoading] = useState(false);

//   const getCarsFromLocalStorage = (): Car[] => {
//     const storedCars = localStorage.getItem(LOCAL_STORAGE_KEY);
//     return storedCars ? JSON.parse(storedCars) : [];
//   };

//   const saveCarsToLocalStorage = (cars: Car[]) => {
//     localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cars));
//   };

//   const getCars = useCallback(() => {
//     setGetLoading(true);
//     try {
//       const cars = getCarsFromLocalStorage();
//       setCars(cars);
//     } catch (error) {
//       console.error("Failed to get cars from localStorage:", error);
//     } finally {
//       setGetLoading(false);
//     }
//   }, []);

//   const addCar = useCallback(
//     (car: Car) => {
//       setAddLoading(true);
//       try {
//         const updatedCars = [...cars, car];
//         saveCarsToLocalStorage(updatedCars);
//         setCars(updatedCars);
//       } catch (error) {
//         console.error("Failed to add car to localStorage:", error);
//       } finally {
//         setAddLoading(false);
//       }
//     },
//     [cars]
//   );

//   const updateCar = useCallback(
//     (id: string, updatedCar: Partial<Car>) => {
//       setUpdateLoading(true);
//       try {
//         const updatedCars = cars.map((car) =>
//           car.id === id ? { ...car, ...updatedCar } : car
//         );
//         saveCarsToLocalStorage(updatedCars);
//         setCars(updatedCars);
//       } catch (error) {
//         console.error("Failed to update car in localStorage:", error);
//       } finally {
//         setUpdateLoading(false);
//       }
//     },
//     [cars]
//   );

//   const deleteCar = useCallback(
//     (id: string) => {
//       setDeleteLoading(true);
//       try {
//         const updatedCars = cars.filter((car) => car.id !== id);
//         saveCarsToLocalStorage(updatedCars);
//         setCars(updatedCars);
//       } catch (error) {
//         console.error("Failed to delete car from localStorage:", error);
//       } finally {
//         setDeleteLoading(false);
//       }
//     },
//     [cars]
//   );

//   const value = useMemo(
//     () => ({
//       cars,
//       addCar,
//       updateCar,
//       deleteCar,
//       getCars,
//       getLoading,
//       deleteLoading,
//       updateLoading,
//       addLoading,
//     }),
//     [
//       cars,
//       addCar,
//       updateCar,
//       deleteCar,
//       getCars,
//       getLoading,
//       deleteLoading,
//       updateLoading,
//       addLoading,
//     ]
//   );

//   useEffect(() => {
//     getCars();
//   }, [getCars]);

//   return <CarContext.Provider value={value}>{children}</CarContext.Provider>;
// };

import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

interface CarContextProps {
  cars: Car[];
  addCar: (car: Car) => Promise<"success" | "error">;
  updateCar: (
    id: string,
    updatedCar: Partial<Car>
  ) => Promise<"success" | "error">;
  deleteCars: (ids: string[]) => Promise<"success" | "error">;
  getCars: () => void;
  getLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;
  addLoading: boolean;
}

const LOCAL_STORAGE_KEY = "cars";

export const CarContext = createContext<CarContextProps | undefined>(undefined);

export const CarProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [getLoading, setGetLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);

  const getCarsFromLocalStorage = (): Car[] => {
    const storedCars = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedCars ? JSON.parse(storedCars) : [];
  };

  const saveCarsToLocalStorage = (cars: Car[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cars));
  };

  const getCars = useCallback(() => {
    setGetLoading(true);
    try {
      const cars = getCarsFromLocalStorage();
      setCars(cars);
    } catch (error) {
      console.error("Failed to get cars from localStorage:", error);
    } finally {
      setGetLoading(false);
    }
  }, []);

  const addCar = useCallback(
    async (car: Car): Promise<"success" | "error"> => {
      setAddLoading(true);
      try {
        const updatedCars = [...cars, car];
        saveCarsToLocalStorage(updatedCars);
        setCars(updatedCars);
        return "success";
      } catch (error) {
        console.error("Failed to add car to localStorage:", error);
        return "error";
      } finally {
        setAddLoading(false);
      }
    },
    [cars]
  );

  const updateCar = useCallback(
    async (
      id: string,
      updatedCar: Partial<Car>
    ): Promise<"success" | "error"> => {
      setUpdateLoading(true);
      try {
        const updatedCars = cars.map((car) =>
          car.id === id ? { ...car, ...updatedCar } : car
        );
        saveCarsToLocalStorage(updatedCars);
        setCars(updatedCars);
        return "success";
      } catch (error) {
        console.error("Failed to update car in localStorage:", error);
        return "error";
      } finally {
        setUpdateLoading(false);
      }
    },
    [cars]
  );

  const deleteCars = useCallback(
    async (ids: string[]): Promise<"success" | "error"> => {
      setDeleteLoading(true);
      try {
        const updatedCars = cars.filter((car) => !ids.includes(car.id));
        saveCarsToLocalStorage(updatedCars);
        setCars(updatedCars);
        return "success";
      } catch (error) {
        console.error("Failed to delete cars from localStorage:", error);
        return "error";
      } finally {
        setDeleteLoading(false);
      }
    },
    [cars]
  );

  const value = useMemo(
    () => ({
      cars,
      addCar,
      updateCar,
      deleteCars,
      getCars,
      getLoading,
      deleteLoading,
      updateLoading,
      addLoading,
    }),
    [
      cars,
      addCar,
      updateCar,
      deleteCars,
      getCars,
      getLoading,
      deleteLoading,
      updateLoading,
      addLoading,
    ]
  );

  useEffect(() => {
    getCars();
  }, [getCars]);

  return <CarContext.Provider value={value}>{children}</CarContext.Provider>;
};
