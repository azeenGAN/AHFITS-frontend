import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  
  const faqs = [
    {
      question: "What is the minimum order quantity (MOQ) for custom sneakers?",
      answer: "Our MOQ is 30 pairs for Europe and 40 pairs for the rest of the world.",
      tag: "BRAND YOUR SHOES"
    },
    {
      question: "How long does it take to receive my customized shoes?",
      answer: "You will receive your 100% customized shoes within 5 to 7 weeks after confirming your order.",
      tag: "BRAND YOUR SHOES"
    },
    {
      question: "Can I reorder previous designs?",
      answer: "Yes, you can reorder at any time from 25 pairs upwards of the same model and design.",
      tag: "BRAND YOUR SHOES"
    },
    {
      question: "What customization options are available?",
      answer: "You can customize nearly every aspect of your sneakers, including branding the upper, tongue, heel, insole, and outsole.",
      tag: "SNEAKER BRANDING"
    },
    {
      question: "Do you offer sustainable material options?",
      answer: "Absolutely, we offer sustainable materials like cactus, cork, and hemp, aligning with our commitment to sustainability.",
      tag: "SNEAKER BRANDING"
    },
    {
      question: "Can I receive a sample before placing a bulk order?",
      answer: "We have discontinued random sample shipments due to environmental and economic considerations. However, we can provide detailed visualizations and prototypes upon request.",
      tag: "SNEAKER BRANDING"
    },
    {
      question: "What are the pricing details for custom sneakers?",
      answer: "Pricing depends on factors such as the chosen model, customization extent, materials, and order quantity. Please contact our sales department for a detailed quotation.",
      tag: "BRAND YOUR SHOES"
    },
    {
      question: "How can I ensure the correct shoe sizes for my team?",
      answer: "We provide a comprehensive size guide and offer sample shoes for fitting to ensure accurate sizing for your employees.",
      tag: ""
    },
    {
      question: "What is your return policy for custom products?",
      answer: "Custom products can be returned only if they are faulty. Please get in touch with our Customer Care team to initiate a return for a faulty pair of custom shoes.",
      tag: "VANS EUROPE"
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we have a wide range of logistics services that allow us to ship our products almost anywhere in the world. Shipping costs depend on the country of delivery and are excluded from the price of the shoes.",
      tag: "BRAND YOUR SHOES"
    }
  ]
  
  export function FAQAccordion() {
    return (
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent>
              <p>{faq.answer}</p>
              {faq.tag && (
                <span className="inline-block mt-2 text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded">
                  {faq.tag}
                </span>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    )
  }
  
  