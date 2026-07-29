import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email a" +
        "ddress"),
    subject: z.string().min(5, "Subject must be at least 5 characters"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
    const { toast } = useToast();

    const form = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
    });

    const onSubmit = (data: ContactFormData) => {
        console.log("Contact form submitted:", data);
        toast({
            title: "Message Sent!",
            description: "Thank you for reaching out. We'll get back to you soon.",
        });
        form.reset();
    };

    return (
        <Card className="border-none shadow-2xl shadow-green-900/10 rounded-[3rem] overflow-hidden" data-testid="card-contact-form">
            <CardHeader className="bg-green-900 p-8 md:p-12 text-white">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-widest text-green-100/70">Ready to Help</span>
                </div>
                <CardTitle className="text-3xl md:text-4xl font-heading font-extrabold leading-tight">Send Us a <span className="text-green-400">Message</span></CardTitle>
                <p className="mt-2 text-green-50/70 font-light">We typically respond within 24 hours.</p>
            </CardHeader>
            <CardContent className="p-8 md:p-12 bg-white">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Full Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="h-14 rounded-2xl border-zinc-100 bg-zinc-50 px-6 focus:bg-white transition-all"
                                                placeholder="Your name"
                                                {...field}
                                                data-testid="input-contact-name"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Email Address</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="h-14 rounded-2xl border-zinc-100 bg-zinc-50 px-6 focus:bg-white transition-all"
                                                type="email"
                                                placeholder="your@email.com"
                                                {...field}
                                                data-testid="input-contact-email"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="subject"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Subject</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="h-14 rounded-2xl border-zinc-100 bg-zinc-50 px-6 focus:bg-white transition-all"
                                            placeholder="What is this about?"
                                            {...field}
                                            data-testid="input-contact-subject"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Message</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            className="rounded-2xl border-zinc-100 bg-zinc-50 px-6 py-4 focus:bg-white transition-all min-h-[150px] resize-none"
                                            placeholder="How can we help you?"
                                            {...field}
                                            data-testid="input-contact-message"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" size="lg" className="w-full bg-green-700 hover:bg-green-800 text-white shadow-xl shadow-green-900/10 h-16 rounded-2xl text-lg font-bold" data-testid="button-contact-submit">
                            <Send className="w-5 h-5 mr-3" />
                            Send Your Message
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
