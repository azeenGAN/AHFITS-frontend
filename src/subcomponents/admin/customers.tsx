import { useState, useEffect, lazy, Suspense } from 'react';
import {   Mail,  Calendar, Building2, MapPin } from 'lucide-react';
import type { ContactInquiry } from './types';
import Adminloading from './adminloading';
import { useToast } from '@/hooks/use-toast';
const FreeQuoteRequests = lazy(() => import('./quoterequests'));




export default function Customers() {

  const [activeTab, setActiveTab] = useState<'contact' | 'quotes'>('contact');
  const [contactInquiries, setContactInquiries] = useState<ContactInquiry[]>([]);
  const [totalInquiries, setTotalInquiries] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  //toast hook
  const { toast } = useToast();
  let docsPerPage = 15;
  // Fetch contact form submissions
  const fetchTouchUs = () => {


    setLoading(true);
    fetch(`/admin/touchusrequests?page=${page}&limit=${docsPerPage}`)
    .then((res) => {
      if (!res.ok) throw new Error('Failed to fetch contact inquiries.');
      return res.json();
    })
    .then((data) => {
 
      setContactInquiries(data.inquiries);
      setTotalInquiries(data.totalDocs);
      toast({ title: 'Contact forms fetched successfully!' });
    })
    .catch((error) => {
      console.error(error);
      toast({ title: 'Error fetching contact forms', description: error.message });
    })
    .finally(() => setLoading(false));
};

useEffect(() => {
  fetchTouchUs();
  console.log(page)
}, [page]);

  if(loading){
    return <div className='flex justify-center items-center flex-col h-screen w-full'>
  <Adminloading/>
    </div>
  }
  

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Customer Inquiries</h1>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('contact')}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'contact'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Contact Form Submissions
        </button>
        <button
          onClick={() => setActiveTab('quotes')}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'quotes'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Quote Requests
        </button>
      </div>

      {/* Search and Filters */}
      

      {activeTab === 'contact' ? (<>
       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contactInquiries.map((inquiry) => (
            <div key={inquiry._id} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg text-black">
                      {`${inquiry.firstname} ${inquiry.Lastname}`}
                    </h3>
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="w-4 h-4 mr-2" />
                        {inquiry.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {inquiry.country}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Building2 className="w-4 h-4 mr-2" />
                        {inquiry.employment}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(inquiry.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
            
        </div>
        <div className="flex items-center justify-center mt-4">
              {/* Previous Button */}
              
              <button
                onClick={() => {
                  if (page > 1) {
                    setPage((prevpage: number) => prevpage - 1);
                  }
                }}
                disabled={page <= 1}
                className="px-5 py-1 border-gray-700 border-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Prev
              </button>

              {/* Current Page Display */}
              <span className="h-full font-semibold bg-gray-200 w-[50px] text-center">{page}</span>

              {/* Next Button: Disable if no more documents */}
              <button
                onClick={() => {
                  if (page * docsPerPage < totalInquiries) {
                    setPage((prevpage: number) => prevpage + 1);
                  }
                }}
                disabled={(page * docsPerPage) >= totalInquiries}
                className="px-5 py-1 border-gray-700 border-2   rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
           
           </>
      ) : (
        /* Quote Requests */
      <Suspense fallback={<Adminloading/>} >

        <FreeQuoteRequests/>
      </Suspense>
      )}
    </div>
  );
}