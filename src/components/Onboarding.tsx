
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { useWallet } from '@/context/WalletContext';
import { Lock, Key, Shield, Wallet } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const { t } = useLanguage();
  const { connectWallet } = useWallet();
  const [step, setStep] = useState(0);
  
  const steps = [
    {
      title: t('onboardingTitle1'),
      description: t('onboardingDesc1'),
      icon: <Shield className="w-12 h-12 text-crypto-primary" />,
    },
    {
      title: t('onboardingTitle2'),
      description: t('onboardingDesc2'),
      icon: <Wallet className="w-12 h-12 text-crypto-primary" />,
    },
    {
      title: t('onboardingTitle3'),
      description: t('onboardingDesc3'),
      icon: <Key className="w-12 h-12 text-crypto-primary" />,
    },
    {
      title: t('connectWallet'),
      description: '',
      icon: <Lock className="w-12 h-12 text-crypto-primary" />,
      isConnectStep: true,
    },
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const handleConnect = async () => {
    await connectWallet();
    onComplete();
  };

  const currentStep = steps[step];

  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center p-6 animate-fade-in z-50">
      <div className="max-w-md w-full bg-card rounded-2xl shadow-lg p-8">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="rounded-full bg-accent p-4 mb-4">
            {currentStep.icon}
          </div>
          <h1 className="text-3xl font-bold mb-2">{step === 0 ? t('welcome') : currentStep.title}</h1>
          {currentStep.description && (
            <p className="text-muted-foreground">{currentStep.description}</p>
          )}
        </div>

        <div className="space-y-4">
          {currentStep.isConnectStep ? (
            <Button 
              variant="default" 
              className="w-full bg-crypto-primary hover:bg-crypto-secondary text-white"
              onClick={handleConnect}
            >
              {t('connectWallet')}
            </Button>
          ) : (
            <Button 
              variant="default" 
              className="w-full bg-crypto-primary hover:bg-crypto-secondary text-white"
              onClick={handleNext}
            >
              {t('next')}
            </Button>
          )}
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleSkip}
          >
            {t('skip')}
          </Button>
        </div>

        <div className="flex justify-center mt-8 gap-1">
          {steps.map((_, index) => (
            <div 
              key={index} 
              className={`w-2 h-2 rounded-full ${index === step ? 'bg-crypto-primary' : 'bg-muted'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
