'use client';

import {
  Item,
  ItemActions,
  ItemContent,
  ItemTitle
} from '@/components/ui/item';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { getAllFeatureFlags, setFeatureFlag } from '@/apis/feature-flag.api';
import { Switch } from '@/components/ui/switch';
import { SaveAllIcon } from 'lucide-react';
import { toast } from 'sonner';

const SettingsPage = () => {
  const [originalFeatureFlags, setOriginalFeatureFlags] = useState<
    Record<string, string> | undefined
  >();
  const [featureFlags, setFeatureFlags] = useState<
    Record<string, string> | undefined
  >();
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    getAllFeatureFlags().then((res) => {
      const normalized = Object.fromEntries(
        Object.entries(res ?? {}).map(([key, value]) => [key, String(value)])
      );

      setOriginalFeatureFlags(normalized);
      setFeatureFlags(normalized);
    });
  }, []);

  const changedEntries = Object.entries(featureFlags ?? {}).filter(
    ([key, value]) => originalFeatureFlags?.[key] !== value
  );

  const isChanged = changedEntries.length > 0;

  const onSave = async () => {
    if (!isChanged || isSaving) {
      return;
    }

    setIsSaving(true);

    try {
      await Promise.all(
        changedEntries.map(([key, value]) => setFeatureFlag(key, value))
      );

      setOriginalFeatureFlags(featureFlags);
      toast.success('설정이 저장되었습니다.');
    } catch {
      toast.error('설정 저장을 실패했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!featureFlags) {
    return <></>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-start">
        <Button
          className="cursor-pointer"
          onClick={onSave}
          disabled={!isChanged || isSaving}
        >
          <SaveAllIcon />
          저장
        </Button>
      </div>

      <div className="max-w-[1400px] grid grid-cols-1 gap-4 xl:grid-cols-2">
        {Object.entries(featureFlags).map(([key, value]) => (
          <Item variant="outline" className="h-20" key={key}>
            <ItemContent>
              <ItemTitle>{key}</ItemTitle>
            </ItemContent>
            <ItemActions className="max-w-96">
              {value === 'true' || value === 'false' ? (
                <Switch
                  className="cursor-pointer"
                  checked={value === 'true'}
                  disabled={isSaving}
                  onCheckedChange={(checked) => {
                    setFeatureFlags((prev) => {
                      if (!prev) {
                        return prev;
                      }

                      return {
                        ...prev,
                        [key]: checked ? 'true' : 'false'
                      };
                    });
                  }}
                />
              ) : (
                <Input
                  value={value}
                  disabled={isSaving}
                  onChange={(e) => {
                    setFeatureFlags((prev) => {
                      if (!prev) {
                        return prev;
                      }

                      return {
                        ...prev,
                        [key]: e.target.value
                      };
                    });
                  }}
                />
              )}
            </ItemActions>
          </Item>
        ))}
      </div>
    </div>
  );
};

export default SettingsPage;
