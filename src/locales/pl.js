export default {
  home: {
    title: "Pulpit systemowy",
    manageWidgets: "Zarządzaj widgetami",
    widgetManager: {
      title: "Zarządzanie widgetami",
      widgetName: "Nazwa widgetu",
      status: "Status",
      actions: "Akcje",
      enabled: "Włączony",
      disabled: "Wyłączony",
      activate: "Włącz",
      deactivate: "Wyłącz",
      cancel: "Anuluj",
      saveChanges: "Zapisz zmiany"
    }
  },
  storageDisks: {
    title: 'Dyski magazynujące',
    device: 'Urządzenie',
    model: 'Model',
    serial: 'Numer seryjny',
    vendor: 'Dostawca',
    capacity: 'Pojemność',
    errorLoading: 'Błąd ładowania danych dysków',
    refresh: 'Odśwież listę dysków',
    scanNew: 'Skanuj nowe urządzenia',
    scanSuccess: 'Skanowanie zakończone',
    scanComplete: 'Zakończono skanowanie w poszukiwaniu nowych urządzeń',
    scanError: 'Błąd podczas skanowania'
  },
  storageFilesystems: {
    title: 'Systemy plików',
    device: 'Urządzenie',
    tags: 'Tagi',
    type: 'Typ',
    available: 'Dostępne',
    used: 'Użycie',
    mounted: 'Zamontowane',
    reference: 'Odwołanie',
    status: 'Status',
    refresh: 'Odśwież',
    errorLoading: 'Błąd ładowania systemów plików'
  },
  storageSmart: {
    title: 'Monitorowane urządzenia',
    monitored: 'Monitorowane',
    device: 'Urządzenie',
    model: 'Model',
    vendor: 'Dostawca',
    serial: 'Numer seryjny',
    wwn: 'WWN',
    capacity: 'Pojemność',
    temperature: 'Temperatura',
    statusS: 'Status (S.M.A.R.T)',
    statusValues: {
      healthy: 'Zdrowy',
      warning: 'Ostrzeżenie',
      error: 'Błąd',
      unknown: 'Nieznany',
      unavailable: 'Niedostępne'
    },
    refresh: 'Odśwież',
    errorLoading: 'Błąd ładowania danych SMART',
    enableMonitoring: 'Włącz monitoring',
    disableMonitoring: 'Wyłącz monitoring',
    notAvailableTitle: 'Monitorowanie SMART niedostępne',
    notAvailableMessage: 'Narzędzie smartctl nie jest zainstalowane w systemie',
    notAvailableSolution: 'Aby monitorować stan dysków, zainstaluj pakiet smartmontools:',
    retry: 'Spróbuj ponownie',
    installCommand: 'sudo apt-get install smartmontools',
    unavailable: 'Niedostępne',
    commandCopied: 'Komenda skopiowana do schowka',
    status: {
      passed: 'Pomyślny',
      failed: 'Niepowodzenie',
      unknown: 'Nieznany',
      healthy: 'Sprawny',
      error: 'Błąd',
      warning: 'Ostrzeżenie'
    },
    details: {
      smartStatus: 'Status SMART',
      temperature: 'Temperatura',
      model: 'Model',
      serial: 'Numer seryjny',
      capacity: 'Pojemność',
      produce: 'Producent',
      powerCycleCount: 'Liczba cykli włączeń',
      powerOnHours: 'Czas pracy',
      hours: 'godzin',
      firmware: 'Wersja Firmware',
      wwn: 'WWN',
      interfaceSpeed: 'Prędkość interfejsu',
      currentSpeed: 'Aktualna',
      maxSpeed: 'Maksymalna'
    },
    attributes: {
      noData: 'Brak danych atrybutów SMART'
    }
  },
  network: {
    interfaces: {
      title: 'Interfejsy sieciowe',
      device: 'Urządzenie',
      method: 'Metoda',
      address: 'Adres IP',
      netmask: 'Maska podsieci',
      gateway: 'Brama',
      status: 'Status',
      mac: 'Adres MAC',
      mtu: 'MTU',
      wol: 'WOL',
      speed: 'Prędkość',
      type: 'Typ',
      details_for: 'Szczegóły interfejsu',
      statistics: 'Statystyki',
      rx_bytes: 'Odebrane bajty',
      tx_bytes: 'Wysłane bajty',
      rx_packets: 'Odebrane pakiety',
      tx_packets: 'Wysłane pakiety',
      speed_test: 'Test prędkości',
      start_test: 'Rozpocznij test',
      testing: 'Trwa testowanie...',
      download: 'Pobieranie',
      upload: 'Wysyłanie',
      ping: 'Ping',
      results: 'Wyniki',
      refresh: 'Odśwież',
      save: 'Zapisz',
      healthy: 'sprawny',
      error: 'błąd',
      unknown: 'nieznany',
      up: 'aktywny',
      down: 'nieaktywny',
      actions: 'Akcje',
      refresh: 'Odśwież',
      save: 'Zapisz',
      add_interface: 'Dodaj Interfejs',
      interface_name: 'Nazwa interfejsu',
      interface_type: 'Typ interfejsu',
      interface_types: {
        ethernet: 'Ethernet',
        bridge: 'Most',
        vlan: 'VLAN',
        bond: 'Bonding'
      },
      delete_interface: 'Usuń interfejs',
      delete_confirm: 'Czy na pewno chcesz usunąć interfejs {interface}?',
      delete_success: 'Interfejs został usunięty',
      delete_protected: 'Nie można usunąć chronionego interfejsu',
      delete_not_found: 'Interfejs nie istnieje',
      details: 'Szczegóły',
      delete: 'Usuń',
      cancel: 'Anuluj',
      confirm: 'Potwierdź'
    },
    types: {
      ethernet: 'Ethernet',
      wireless: 'Wi-Fi',
      other: 'Inny'
    },
    methods: {
      dhcp: 'DHCP',
      static: 'Statyczny',
      unknown: 'Nieznany'
    },
    firewall: {
      title: 'Zapora sieciowa',
      rules: 'Reguły',
      enable: 'Włącz',
      disable: 'Wyłącz',
      status: {
        active: 'aktywny',
        inactive: 'nieaktywny'
      },
      actions: {
        allow: 'Zezwól',
        deny: 'Odrzuć'
      },
      rule_action: 'Akcja'
    }
  },
  widgets: {
    SystemInfoWidget: "Informacje systemowe",
    RamWidget: "Pamięć RAM",
    CpuWidget: "Procesor CPU",
    FileSystemWidget: "System plików"
  },
  systemInfo: {
    system: "System",
    hostname: "Nazwa hosta",
    architecture: "Architektura",
    systemTime: "Czas systemowy",
    uptime: "Czas pracy",
    restartRequired: "Wymagany restart",
    cpu: "Procesor",
    manufacturer: "Producent",
    model: "Model",
    cores: "Rdzenie",
    speed: "Taktowanie",
    versions: "Wersje",
    app: "Aplikacja",
    lastUpdate: "Ostatnia aktualizacja",
    node: "Node.js",
    npm: "Npm"
  },
  ram: {
    title: "Pamięć RAM",
    used: "Użyte",
    free: "Wolne",
    active: "Aktywne",
    status: {
      normal: "Normalne",
      high: "Wysokie",
      critical: "Krytyczne",
      error: "Błąd"
    },
    lastUpdate: "Ostatnia aktualizacja"
  },
  cpu: {
    title: "Procesor",
    usage: "Użycie",
    temperature: "Temperatura",
    cores: "Rdzenie",
    status: {
      normal: "Normalne",
      highLoad: "Wysokie obciążenie",
      error: "Błąd"
    },
    lastUpdate: "Ostatnia aktualizacja"
  },
  fileSystem: {
    title: "System plików",
    device: "Urządzenie",
    mount: "Punkt montowania",
    size: "Rozmiar",
    usage: "Użycie",
    autoRefresh: "Auto-odświeżanie",
    refresh: "Odśwież",
    autoRefreshOn: 'Auto-odświeżanie włączone',
    autoRefreshOff: 'Auto-odświeżanie wyłączone',
    lastUpdate: "Ostatnia aktualizacja"
  },
  common: {
    yes: "Tak",
    no: "Nie",
    loading: "Ładowanie...",
    unknown: "Nieznany",
    error: "Błąd",
    na: 'N/D'
  }
}
