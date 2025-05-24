import { useParams } from "react-router";
import { CryptoItemLine } from "../../../components/CryptoUtils/CryptoItemLine"
import { ErrorComponent } from "../../../components/ErrorComponent";
import { Loader } from "../../../components/Loader";
import { Title } from "../../../components/Title"
import { useCrypto } from "../../../context";


export const TradeOnlyCurrencyPage = () => {
  const { isLoading, error, listing, logoData } = useCrypto();
  const { id } = useParams<{ id: string }>();
  
  // Convert id from string to number
  const numId = id ? parseInt(id, 10) : 0;
  
  // Find the specific cryptocurrency by id
  const result = listing.find(item => item.id === numId);
  
  if (isLoading) return <Loader />;
  if (error) return <ErrorComponent />;
  if (!result) return <div>Cryptocurrency not found</div>;
  console.log(result);
  return (
    <div>
      <Title heading="h2">Trade</Title> 
      <CryptoItemLine logoData={logoData} item={result}/>
    </div>
  )
}
