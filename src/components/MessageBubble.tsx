
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useWallet } from '@/context/WalletContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lock, Unlock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MessageBubbleProps {
  content: string;
  timestamp: Date;
  isEncrypted: boolean;
  isSent: boolean;
  senderAddress?: string;
  decryptedContent?: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  content,
  timestamp,
  isEncrypted,
  isSent,
  senderAddress,
  decryptedContent = '',
}) => {
  const { t, direction } = useLanguage();
  const { decryptMessage } = useWallet();
  const [isDecrypted, setIsDecrypted] = useState(false);
  const [decryptedMessage, setDecryptedMessage] = useState(decryptedContent);
  const [isDecrypting, setIsDecrypting] = useState(false);

  // Format time as HH:MM
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleDecrypt = async () => {
    if (isDecrypted) return; // Already decrypted
    setIsDecrypting(true);
    
    try {
      // In a real app, we would use the actual private key
      const mockPrivateKey = "0x1234...";
      const decrypted = await decryptMessage(content, mockPrivateKey);
      setDecryptedMessage(decrypted);
      setIsDecrypted(true);
    } catch (error) {
      console.error('Error decrypting message:', error);
    } finally {
      setIsDecrypting(false);
    }
  };

  return (
    <div
      className={cn(
        'flex max-w-[80%] message-bubble',
        isSent ? 'justify-end ml-auto sent' : 'justify-start received'
      )}
    >
      <div
        className={cn(
          'rounded-xl p-3 shadow my-1 max-w-full',
          isSent
            ? 'bg-crypto-primary text-white rounded-tr-none'
            : 'bg-muted rounded-tl-none'
        )}
      >
        {/* Encryption badge */}
        {isEncrypted && (
          <div className="flex items-center gap-1 mb-2">
            {isDecrypted ? (
              <>
                <Unlock size={14} />
                <Badge variant="outline" className="text-xs font-normal">
                  {t('messageDecrypted')}
                </Badge>
              </>
            ) : (
              <>
                <Lock size={14} />
                <Badge variant="outline" className="text-xs font-normal">
                  {t('encryptedMessage')}
                </Badge>
              </>
            )}
          </div>
        )}

        {/* Message content */}
        <div className={`direction-${direction} break-words`}>
          {isEncrypted && !isDecrypted ? (
            <div className="text-opacity-80 font-mono text-sm blur-[2px] hover:blur-none transition-all">
              {content.substring(0, 30)}...
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleDecrypt} 
                disabled={isDecrypting}
                className="mt-2 text-xs"
              >
                {isDecrypting ? t('loading') : 'Decrypt'}
              </Button>
            </div>
          ) : (
            <p>{isDecrypted ? decryptedMessage : content}</p>
          )}
        </div>
        
        {/* Timestamp */}
        <div className="text-xs opacity-70 text-right mt-1">
          {formatTime(timestamp)}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
