// src/hooks/useApplications.ts
import { useState, useEffect, useCallback } from 'react';
import { applicationService } from '@/services/applicationService';
import type { Application, ApplicationInsert, ApplicationStatus } from '@/types';
import { useAuth } from '@/context/AuthContext';

export const useApplications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApplications = useCallback(async () => {
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
  }, [user]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  // Realtime subscription
  useEffect(() => {
    if (!user) return;

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
  }, [user]);

  const createApplication = useCallback(async (data: ApplicationInsert): Promise<Application> => {
    const newApp = await applicationService.create(data);
    // Optimistic update (realtime will also fire but de-duped)
    setApplications((prev) => [newApp, ...prev]);
    return newApp;
  }, []);

  const updateApplication = useCallback(async (
    id: string,
    updates: Partial<ApplicationInsert>
  ): Promise<Application> => {
    // Optimistic update
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
      // Rollback on error
      fetchApplications();
      throw err;
    }
  }, [fetchApplications]);

  const updateApplicationStatus = useCallback(async (
    id: string,
    status: ApplicationStatus
  ): Promise<void> => {
    // Optimistic update
    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
    try {
      await applicationService.updateStatus(id, status);
    } catch (err) {
      fetchApplications();
      throw err;
    }
  }, [fetchApplications]);

  const deleteApplication = useCallback(async (id: string): Promise<void> => {
    // Optimistic update
    setApplications((prev) => prev.filter((a) => a.id !== id));
    try {
      await applicationService.delete(id);
    } catch (err) {
      fetchApplications();
      throw err;
    }
  }, [fetchApplications]);

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
