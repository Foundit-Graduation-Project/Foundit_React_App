import TermsOfServicePopup from '../../popups/TermsOfServicePopup';
import PrivacyPolicyPopup from '../../popups/PrivacyPolicyPopup';
import { useState } from 'react';

export default function ResetPasswordFooter() {
      const [termsOpen, setTermsOpen] = useState(false);
      const [privacyOpen, setPrivacyOpen] = useState(false);
  return (
    <div>
      <footer className="mt-8 text-center space-y-2 pb-10">
        <p className="text-xs text-slate-400">
          © 2026 FindIt. All rights reserved.
        </p>
        <div className="flex gap-4 text-xs text-slate-400 justify-center">
          <a href="#" className="hover:underline"  onClick={(e) => {
                        e.preventDefault();
                        setPrivacyOpen(true);
                      }}>
            Privacy Policy
          </a>
          <a href="#" className="hover:underline"onClick={(e) => {
                        e.preventDefault();
                        setTermsOpen(true);
                      }}>
            Terms of Service
            
          </a>
        </div>
        <TermsOfServicePopup open={termsOpen} setOpen={setTermsOpen} />
        <PrivacyPolicyPopup open={privacyOpen} setOpen={setPrivacyOpen} />
      </footer>
    </div>
  )
}
