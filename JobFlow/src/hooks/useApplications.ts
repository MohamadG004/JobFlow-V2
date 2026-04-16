import { useState, useEffect, useCallback } from 'react';
import { applicationService } from '@/services/applicationService';
import type { Application, ApplicationInsert, ApplicationStatus } from '@/types';
import { useAuth } from '@/context/AuthContext';

const GUEST_APPS_KEY = 'jobflow-guest-applications';

const loadGuestApplications = (): Application[] => {
  try {
    const stored = sessionStorage.getItem(GUEST_APPS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveGuestApplications = (apps: Application[]) => {
  try {
    sessionStorage.setItem(GUEST_APPS_KEY, JSON.stringify(apps));
  } catch {
    // sessionStorage full or unavailable — fail silently
  }
};

// Helper to update state AND sessionStorage together for guest apps
const setGuestApplications = (
  updater: (prev: Application[]) => Application[],
  setter: React.Dispatch<React.SetStateAction<Application[]>>
) => {
  setter((prev) => {
    const next = updater(prev);
    saveGuestApplications(next);
    return next;
  });
};

export const useApplications = () => {
  const { user, guestMode } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApplications = useCallback(async () => {
    if (guestMode) {
      // Restore from sessionStorage instead of wiping state
      setApplications(loadGuestApplications());
      setError(null);
      setLoading(false);
      return;
    }

    if (!user) return;

    try {
      setLoading(true);
      const data = await applicationService.getAll();
      setApplications(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  }, [user, guestMode]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  // Clear guest storage when leaving guest mode
  useEffect(() => {
    if (!guestMode) {
      sessionStorage.removeItem(GUEST_APPS_KEY);
    }
  }, [guestMode]);

  // Realtime subscription
  useEffect(() => {
    if (!user || guestMode) return;

    const channel = applicationService.subscribeToChanges(
      user.id,
      (newApp) => {
        setApplications((prev) => {
          if (prev.find((a) => a.id === newApp.id)) return prev;
          return [newApp, ...prev];
        });
      },
      (updatedApp) => {
        setApplications((prev) =>
          prev.map((a) => (a.id === updatedApp.id ? updatedApp : a))
        );
      },
      (deletedId) => {
        setApplications((prev) => prev.filter((a) => a.id !== deletedId));
      }
    );

    return () => {
      channel.unsubscribe();
    };
  }, [user, guestMode]);

  const createApplication = useCallback(async (data: ApplicationInsert): Promise<Application> => {
    if (guestMode) {
      const newApp: Application = {
        id: `guest-${Date.now()}`,
        user_id: 'guest',
        created_at: new Date().toISOString(),
        applied_date: data.applied_date,
        notes: data.notes ?? '',
        status: data.status,
        company: data.company,
        role: data.role,
      };
      setGuestApplications((prev) => [newApp, ...prev], setApplications);
      return newApp;
    }

    const newApp = await applicationService.create(data);
    setApplications((prev) => [newApp, ...prev]);
    return newApp;
  }, [guestMode]);

  const updateApplication = useCallback(async (
    id: string,
    updates: Partial<ApplicationInsert>
  ): Promise<Application> => {
    if (guestMode) {
      let updated: Application | undefined;
      setGuestApplications((prev) => {
        updated = prev.find((a) => a.id === id);
        return prev.map((a) => (a.id === id ? { ...a, ...updates } : a));
      }, setApplications);
      if (!updated) throw new Error('Application not found');
      return { ...updated, ...updates } as Application;
    }

    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updates } : a))
    );
    try {
      const updated = await applicationService.update(id, updates);
      setApplications((prev) =>
        prev.map((a) => (a.id === id ? updated : a))
      );
      return updated;
    } catch (err) {
      fetchApplications();
      throw err;
    }
  }, [guestMode, fetchApplications]);

  const updateApplicationStatus = useCallback(async (
    id: string,
    status: ApplicationStatus
  ): Promise<void> => {
    if (guestMode) {
      setGuestApplications((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status } : a)),
        setApplications
      );
      return;
    }

    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
    try {
      await applicationService.updateStatus(id, status);
    } catch (err) {
      fetchApplications();
      throw err;
    }
  }, [guestMode, fetchApplications]);

  const deleteApplication = useCallback(async (id: string): Promise<void> => {
    if (guestMode) {
      setGuestApplications((prev) => prev.filter((a) => a.id !== id), setApplications);
      return;
    }

    setApplications((prev) => prev.filter((a) => a.id !== id));
    try {
      await applicationService.delete(id);
    } catch (err) {
      fetchApplications();
      throw err;
    }
  }, [guestMode, fetchApplications]);

  return {
    applications,
    loading,
    error,
    refetch: fetchApplications,
    createApplication,
    updateApplication,
    updateApplicationStatus,
    deleteApplication,
  };
};