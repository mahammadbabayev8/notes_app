import { ArrowLeft, Moon, Sun, Cloud, HardDrive, Lock, Type } from 'lucide-react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { toast } from 'sonner@2.0.3';

interface SettingsScreenProps {
  onBack: () => void;
  theme: 'light' | 'dark' | 'system';
  onThemeChange: (theme: 'light' | 'dark' | 'system') => void;
}

export function SettingsScreen({ onBack, theme, onThemeChange }: SettingsScreenProps) {
  const handleSyncToggle = (enabled: boolean) => {
    toast.success(enabled ? 'Sync enabled' : 'Sync disabled');
  };

  const handleBiometricToggle = (enabled: boolean) => {
    toast.success(enabled ? 'Biometric lock enabled' : 'Biometric lock disabled');
  };

  const handleFontSizeChange = (size: string) => {
    toast.success(`Font size changed to ${size}`);
  };

  const handleFontStyleChange = (style: string) => {
    toast.success(`Font style changed to ${style}`);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </div>
          <h1 className="text-slate-900 dark:text-slate-100">Settings</h1>
        </div>
      </div>

      {/* Settings Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-4 space-y-6">
          {/* Appearance Section */}
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center">
                <Sun className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h2 className="text-slate-900 dark:text-slate-100">Appearance</h2>
                <p className="text-slate-600 dark:text-slate-400">
                  Customize how the app looks
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="theme">Theme</Label>
                <Select value={theme} onValueChange={(value: any) => onThemeChange(value)}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">
                      <div className="flex items-center gap-2">
                        <Sun className="w-4 h-4" />
                        Light
                      </div>
                    </SelectItem>
                    <SelectItem value="dark">
                      <div className="flex items-center gap-2">
                        <Moon className="w-4 h-4" />
                        Dark
                      </div>
                    </SelectItem>
                    <SelectItem value="system">
                      <div className="flex items-center gap-2">
                        System
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <Label htmlFor="font-size">Font Size</Label>
                <Select defaultValue="medium" onValueChange={handleFontSizeChange}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                    <SelectItem value="extra-large">Extra Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="font-style">Font Style</Label>
                <Select defaultValue="system" onValueChange={handleFontStyleChange}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="system">System Default</SelectItem>
                    <SelectItem value="serif">Serif</SelectItem>
                    <SelectItem value="sans-serif">Sans Serif</SelectItem>
                    <SelectItem value="monospace">Monospace</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Sync Section */}
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-950 flex items-center justify-center">
                <Cloud className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-slate-900 dark:text-slate-100">Sync & Backup</h2>
                <p className="text-slate-600 dark:text-slate-400">
                  Keep your notes in sync across devices
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="cloud-sync">Cloud Sync</Label>
                  <p className="text-slate-500 dark:text-slate-400">
                    Sync notes with cloud storage
                  </p>
                </div>
                <Switch id="cloud-sync" onCheckedChange={handleSyncToggle} />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <Label htmlFor="sync-provider">Sync Provider</Label>
                <Select defaultValue="google-drive">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="google-drive">Google Drive</SelectItem>
                    <SelectItem value="icloud">iCloud</SelectItem>
                    <SelectItem value="dropbox">Dropbox</SelectItem>
                    <SelectItem value="local">Local Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-backup">Automatic Backup</Label>
                  <p className="text-slate-500 dark:text-slate-400">
                    Backup notes automatically
                  </p>
                </div>
                <Switch id="auto-backup" defaultChecked />
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-950 flex items-center justify-center">
                <Lock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h2 className="text-slate-900 dark:text-slate-100">Security</h2>
                <p className="text-slate-600 dark:text-slate-400">
                  Protect your notes with additional security
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="pin-lock">PIN Lock</Label>
                  <p className="text-slate-500 dark:text-slate-400">
                    Require PIN to open app
                  </p>
                </div>
                <Switch id="pin-lock" />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="biometric">Biometric Authentication</Label>
                  <p className="text-slate-500 dark:text-slate-400">
                    Use fingerprint or face ID
                  </p>
                </div>
                <Switch id="biometric" onCheckedChange={handleBiometricToggle} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="lock-notes">Lock Individual Notes</Label>
                  <p className="text-slate-500 dark:text-slate-400">
                    Protect sensitive notes
                  </p>
                </div>
                <Switch id="lock-notes" />
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <h2 className="text-slate-900 dark:text-slate-100 mb-4">About</h2>
            <div className="space-y-2 text-slate-600 dark:text-slate-400">
              <p>Version 1.0.0</p>
              <p>© 2025 Notes App. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
