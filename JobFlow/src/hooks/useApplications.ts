// src/hooks/useApplications.ts
import { useState, useEffect, useCallback } from 'react';
import { applicationService } from '@/services/applicationService';
import type { Application, ApplicationInsert, ApplicationStatus } from '@/types';
import { useAuth } from '@/context/AuthContext';

export const useApplications = () => {
  const { user, guestMode } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApplications = useCallback(async () => {
    if (guestMode) {
      setApplications([]);
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
      setApplications((prev) => [newApp, ...prev]);
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
      setApplications((prev) =>
        prev.map((a) => (a.id === id ? { ...a, ...updates } : a))
      );
      const updated = applications.find((a) => a.id === id);
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
  }, [applications, guestMode, fetchApplications]);

  const updateApplicationStatus = useCallback(async (
    id: string,
    status: ApplicationStatus
  ): Promise<void> => {
    if (guestMode) {
      setApplications((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status } : a))
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
      setApplications((prev) => prev.filter((a) => a.id !== id));
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
