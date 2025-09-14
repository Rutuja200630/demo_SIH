import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const schema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(7, "Valid phone required"),
  password: z.string().min(6, "Min 6 characters"),
  itinerary: z.string().min(5, "Please share a brief plan"),
  emergencyName: z.string().min(2, "Required"),
  emergencyPhone: z.string().min(7, "Valid phone required"),
  docType: z.enum(["aadhaar", "passport"]),
  docNumber: z.string().min(4, "Document number required"),
  consent: z.boolean().refine((v) => v === true, { message: "You must consent to continue" }),
  documentFileName: z.string().min(1, "Document file is required"),
});

type FormData = z.infer<typeof schema>;

export default function AuthRegister() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { docType: "aadhaar" },
    mode: "onBlur",
  });

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setValue("documentFileName", f.name, { shouldValidate: true });
  };

  async function onSubmit(values: FormData) {
    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: values.fullName,
          email: values.email,
          phone: values.phone,
          password: values.password,
          itinerary: values.itinerary,
          emergencyName: values.emergencyName,
          emergencyPhone: values.emergencyPhone,
          documentType: values.docType,
          documentNumber: values.docNumber,
          documentFileName: values.documentFileName,
        }),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setSubmitted(true);
    } catch (e) {
      alert("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <main className="container mx-auto py-8 max-w-2xl">
        <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
          <h1 className="text-xl font-semibold mb-2">Application submitted!</h1>
          <p className="text-sm text-foreground/70">You will be notified once your verification is complete.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto py-8 max-w-2xl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Apply for Digital Tourist ID</h1>
          <div className="text-sm text-foreground/70">Step {step} of 4</div>
        </div>

        {step === 1 && (
          <div className="grid gap-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" {...register("fullName")} />
              {errors.fullName && <p className="text-sm text-red-500 mt-1">{errors.fullName.message}</p>}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" {...register("email")} />
                {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" {...register("phone")} />
                {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>}
              </div>
            </div>
            <div>
              <Label htmlFor="password">Create Password</Label>
              <Input id="password" type="password" {...register("password")} />
              {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-4">
            <div>
              <Label htmlFor="itinerary">Planned Itinerary</Label>
              <Textarea id="itinerary" rows={4} {...register("itinerary")} />
              {errors.itinerary && <p className="text-sm text-red-500 mt-1">{errors.itinerary.message}</p>}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="emergencyName">Emergency Contact Name</Label>
                <Input id="emergencyName" {...register("emergencyName")} />
                {errors.emergencyName && <p className="text-sm text-red-500 mt-1">{errors.emergencyName.message}</p>}
              </div>
              <div>
                <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                <Input id="emergencyPhone" type="tel" {...register("emergencyPhone")} />
                {errors.emergencyPhone && <p className="text-sm text-red-500 mt-1">{errors.emergencyPhone.message}</p>}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="grid gap-4">
            <div>
              <Label>Document Type</Label>
              <RadioGroup value={watch("docType")} onValueChange={(v) => setValue("docType", v as any, { shouldValidate: true })} className="flex gap-6 mt-1">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="aadhaar" id="aadhaar" />
                  <Label htmlFor="aadhaar">Aadhaar</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="passport" id="passport" />
                  <Label htmlFor="passport">Passport</Label>
                </div>
              </RadioGroup>
              {errors.docType && <p className="text-sm text-red-500 mt-1">{errors.docType.message}</p>}
            </div>
            <div>
              <Label htmlFor="docNumber">Document Number</Label>
              <Input id="docNumber" {...register("docNumber")} />
              {errors.docNumber && <p className="text-sm text-red-500 mt-1">{errors.docNumber.message}</p>}
            </div>
            <div>
              <Label htmlFor="docFile">Upload Document</Label>
              <Input id="docFile" type="file" accept="image/*,application/pdf" onChange={onFileChange} />
              {errors.documentFileName && <p className="text-sm text-red-500 mt-1">{errors.documentFileName.message}</p>}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="grid gap-4">
            <div className="flex items-start gap-2">
              <Checkbox id="consent" checked={watch("consent") || false} onCheckedChange={(v) => setValue("consent", Boolean(v), { shouldValidate: true })} />
              <Label htmlFor="consent">I agree to the Terms and Conditions and consent to the verification of my documents.</Label>
            </div>
            {errors.consent && <p className="text-sm text-red-500 mt-1">{errors.consent.message}</p>}
          </div>
        )}

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => setStep((s) => Math.max(1, s - 1))} disabled={step === 1}>Back</Button>
          {step < 4 ? (
            <Button type="button" onClick={() => setStep((s) => Math.min(4, s + 1))}>Next</Button>
          ) : (
            <Button type="submit" disabled={submitting}>{submitting ? "Submitting..." : "Submit Application"}</Button>
          )}
        </div>
      </form>
    </main>
  );
}
