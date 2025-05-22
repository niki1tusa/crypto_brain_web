import { CryptoItemLine } from "../../../components/CryptoUtils/CryptoItemLine"
import { ErrorComponent } from "../../../components/ErrorComponent";
import { Loader } from "../../../components/Loader";
import { Title } from "../../../components/Title"
import { useCrypto } from "../../../context";


export const TradeOnlyCurrencyPage = () => {
  	const { isLoading, error, listing, logoData } = useCrypto();

    	if (isLoading) return <Loader />;
	if (error) return <ErrorComponent />;
  return (
    <div>
     <Title heading="h2">Trade</Title> 
      <CryptoItemLine logoData={logoData} item={listing[0]}/>
      </div>
  )
}
