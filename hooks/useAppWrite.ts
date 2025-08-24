import { useEffect, useState } from "react";
import { Alert } from "react-native";

const useAppWrite = (fn: Function) => {
   const [data, setData] = useState<any>([]);
   const [isLoading, setIsLoading] = useState(true);
 
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response: any = await fn();
      if (!response) throw new Error();
      setData(response);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

   return {data, isLoading, refetch}
}





export default useAppWrite

