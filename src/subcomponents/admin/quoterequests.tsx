import {useEffect, useState} from 'react';
import type {  QuoteRequest } from './types';
import {   Mail, Phone,  Building2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Adminloading from './adminloading';
import Freequotelogoimage from './freequotelogoimage';

const quoterequests = () => {
    const { toast } = useToast();

  const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>([]);
    const [loading, setLoading] = useState(false);
//pagination states
const [freequotepage, setfreequotepage] = useState(1);
const [totalFreeQuoteInquiries, settotalFreeQuoteInquiries] = useState(0);
let docsPerPage = 15;

    // Example function to fetch quote requests with pagination
const fetchQuoteRequests = () => {

    setLoading(true);
    fetch(`/admin/freequoterequests?page=${freequotepage}&limit=${docsPerPage}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch quote requests.");
        }
        return res.json();
      })
      .then((data) => {
        // Server should return something like:
        // { quoteRequests: QuoteRequest[], totalDocs: number }
        setQuoteRequests(data.quoteRequests);
        settotalFreeQuoteInquiries(data.totalDocs);
        toast({ title: "Quote requests fetched successfully!" });
        console.log(data)

      })
      .catch((error) => {
        console.error(error);
        toast({
          title: "Error fetching quote requests",
          description: error.message,
        });
      })
      .finally(() =>
         setLoading(false));
  };
    
  useEffect(() => {
    fetchQuoteRequests();
  }
  , [freequotepage]);

  if(loading){
    return <div className='flex justify-center items-center flex-col h-screen w-full'>
  <Adminloading/>
    </div>
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
    {quoteRequests.map((quote) => (
      <div key={quote._id} className="bg-white rounded-xl p-6 shadow-sm">
        <div className="space-y-4">
          <div className="flex justify-between">
            <h3 className="font-semibold text-lg">
              {quote.firstname} {quote.Lastname}
            </h3>
            <span className="text-sm text-gray-500">
              {quote.date}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <Building2 className="w-4 h-4 mr-2" />
                {quote.company}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="w-4 h-4 mr-2" />
                {quote.email}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="w-4 h-4 mr-2" />
                {quote.phone}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-600">
                <strong>Address:</strong><br />
                {quote.houseStreet}<br />
                {quote.localArea}<br />
                {quote.city}, {quote.country}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-4">
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <span className="font-medium">Pairs Requested:</span>{' '}
                {quote.pairs}
              </div>
            
                <Freequotelogoimage id={quote._id} />
         
            </div>
            {quote.notes && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">
                  <strong>Notes:</strong> {quote.notes}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    ))}
    <div className="flex items-center justify-center gap-3 mt-4">
        <button
            onClick={() => {
                if (freequotepage > 1) {
                    setfreequotepage((prev) => prev - 1)
                }
            }}
            disabled={freequotepage <= 1}
            className="px-4 py-1 border rounded disabled:opacity-50"
        >
            Prev
        </button>
        <span>{freequotepage}</span>
        <button
            onClick={() => {
                if (freequotepage * docsPerPage < totalFreeQuoteInquiries) {
                    setfreequotepage((prev) => prev + 1)
                }
            }}
            disabled={freequotepage * docsPerPage >= totalFreeQuoteInquiries}
            className="px-4 py-1 border rounded disabled:opacity-50"
        >
            Next
        </button>
    </div>
  </div>
  )
}

export default quoterequests
