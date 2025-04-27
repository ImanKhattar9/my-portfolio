'use client';
import { formSchema } from '@/lib/schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState, useEffect, useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { motion } from 'framer-motion';

export default function ContactForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      message: '',
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [currentWord, setCurrentWord] = useState('Hello');
  const [isInView, setIsInView] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      setIsSent(false);
  
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
  
      if (response.ok) {
        form.reset();
        setIsSent(true);
      } else {
        const errorText = await response.text(); // 🔥 Log the actual server error
        console.error('API error:', errorText);  // 🔍 This will help debug
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Auto-rotate greeting words
  useEffect(() => {
    const words = ['Hello', 'Bonjour', 'سلام', 'Hola', 'Ciao']; // Move words here
    const interval = setInterval(() => {
      setCurrentWord((prevWord) => {
        const currentIndex = words.indexOf(prevWord);
        return words[(currentIndex + 1) % words.length];
      });
    }, 1200);

    return () => clearInterval(interval);
  }, []); // No need to include words in the dependency array

  // Intersection observer for animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    const currentRef = ref.current; // Copy ref.current to a variable
    if (currentRef) observer.observe(currentRef);
    
    return () => {
      if (currentRef) observer.unobserve(currentRef); // Use the variable here
    };
  }, []);

  useEffect(() => {
    if (isInView) setAnimationComplete(true);
  }, [isInView]);

  // Reset "Sent ✅" button after 5 seconds
  useEffect(() => {
    if (isSent) {
      const timeout = setTimeout(() => setIsSent(false), 5000);
      return () => clearTimeout(timeout);
    }
  }, [isSent]);

  return (
    <div
      id="contact"
      ref={ref}
      className="min-h-screen flex flex-col md:flex-col lg:flex-row items-center justify-center p-9 gap-16"
    >
      {/* Left Side: Heading Section */}
      <motion.div
        className="flex flex-col justify-center items-center text-center sm:text-left flex-1"
        initial={{ scale: 1, opacity: 0, x: '-50%', y: '-50%', position: 'fixed' }}
        animate={
          isInView
            ? {
                scale: [1, 1.5, 1],
                opacity: 1,
                x: 0,
                y: 0,
                position: 'relative',
              }
            : {}
        }
        transition={{ duration: 3, ease: 'easeInOut' }}
      >
        <h1 className="text-[6rem] sm:text-[10rem] md:text-[12rem] lg:text-[10rem] font-lacquer text-white">
          {currentWord}
        </h1>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-protestRevolution text-gray-500 mt-4">
  This is Iman Khattar, Let&apos;s Get in Touch.
</h2>
      </motion.div>

      {/* Right Side: Contact Form */}
      {animationComplete && (
        <motion.div
          className="w-full sm:w-auto flex-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3 }}
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-2 text-gray-800">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="First Name"
                            {...field}
                            className="border-b-2 border-gray-300 focus:border-gray-400"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2 text-gray-800">
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Last Name"
                            {...field}
                            className="border-b-2 border-gray-300 focus:border-gray-400"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="space-y-2 text-gray-800">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Email address"
                          {...field}
                          className="border-b-2 border-gray-300 focus:border-gray-400"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2 text-gray-800">
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          id="message"
                          placeholder="Leave a message please"
                          {...field}
                          className="min-h-[100px] border-b-2 border-gray-300 focus:border-gray-400"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting || isSent}
                className="w-full text-[1.5rem] text-white font-protestRevolution border-b-2 border-gray-300 focus:border-gray-400 cursor-pointer"
              >
                {isSubmitting
                  ? 'Sending...'
                  : isSent
                  ? 'Sent ✅'
                  : 'submit'}
              </Button>
            </form>
          </Form>
        </motion.div>
      )}
    </div>
  );
}
