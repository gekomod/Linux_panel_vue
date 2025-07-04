export default {
  home: {
    title: "System Dashboard",
    manageWidgets: "Manage Widgets",
    widgetManager: {
      title: "Widget Management",
      widgetName: "Widget Name",
      status: "Status",
      actions: "Actions",
      enabled: "Enabled",
      disabled: "Disabled",
      activate: "Activate",
      deactivate: "Deactivate",
      cancel: "Cancel",
      saveChanges: "Save Changes"
    }
  },
  storageDisks: {
    title: 'Storage Disks',
    device: 'Device',
    model: 'Model',
    serial: 'Serial Number',
    vendor: 'Vendor',
    capacity: 'Capacity',
    errorLoading: 'Error loading disks data',
    refresh: 'Odśwież listę dysków',
    scanNew: 'Skanuj nowe urządzenia',
    scanSuccess: 'Skanowanie zakończone',
    scanComplete: 'Zakończono skanowanie w poszukiwaniu nowych urządzeń',
    scanError: 'Błąd podczas skanowania'
  },
  storageFilesystems: {
    title: 'Filesystems',
    device: 'Device',
    tags: 'Tags',
    type: 'Type',
    available: 'Available',
    used: 'Used',
    mounted: 'Mounted',
    reference: 'Reference',
    status: 'Status',
    refresh: 'Refresh',
    errorLoading: 'Error loading filesystems'
  },
  storageSmart: {
    title: 'Monitored Devices',
    monitored: 'Monitored',
    device: 'Device',
    model: 'Model',
    vendor: 'Vendor',
    serial: 'Serial Number',
    wwn: 'WWN',
    capacity: 'Capacity',
    temperature: 'Temperature',
    statusS: 'Status (S.M.A.R.T)',
    statusValues: {
      healthy: 'Healthy',
      warning: 'Warning',
      error: 'Error',
      unknown: 'Unknown',
      unavailable: 'Unavailable'
    },
    refresh: 'Refresh',
    errorLoading: 'Error loading SMART data',
    enableMonitoring: 'Enable monitoring',
    disableMonitoring: 'Disable monitoring',
    notAvailableTitle: 'SMART monitoring unavailable',
    notAvailableMessage: 'The smartctl tool is not installed on the system',
    notAvailableSolution: 'To monitor disk health, install smartmontools package:',
    retry: 'Retry',
    installCommand: 'sudo apt-get install smartmontools',
    unavailable: 'Unavailable',
    commandCopied: 'Command copied to clipboard'
  },
  network: {
    interfaces: {
      title: 'Network Interfaces',
      device: 'Device',
      method: 'Method',
      address: 'IP Address',
      netmask: 'Netmask',
      gateway: 'Gateway',
      status: 'Status',
      mac: 'MAC Address',
      mtu: 'MTU',
      wol: 'WOL',
      speed: 'Speed',
      type: 'Type',
      details_for: 'Interface Details',
      statistics: 'Statistics',
      rx_bytes: 'RX Bytes',
      tx_bytes: 'TX Bytes',
      rx_packets: 'RX Packets',
      tx_packets: 'TX Packets',
      speed_test: 'Speed Test',
      start_test: 'Start Test',
      testing: 'Testing...',
      download: 'Download',
      upload: 'Upload',
      ping: 'Ping',
      results: 'Results',
      refresh: 'Refresh',
      save: 'Save',
      healthy: 'healthy',
      error: 'error',
      unknown: 'unknown',
      up: 'up',
      down: 'down',
      actions: 'Actions',
      refresh: 'Refresh',
      save: 'Save',
      add_interface: 'Add Interface',
      interface_name: 'Interface name',
      interface_type: 'Interface type',
      interface_types: {
        ethernet: 'Ethernet',
        bridge: 'Bridge',
        vlan: 'VLAN',
        bond: 'Bonding'
      },
      delete_interface: 'Delete Interface',
      delete_confirm: 'Are you sure you want to delete interface {interface}?',
      delete_success: 'Interface deleted successfully',
      delete_protected: 'Cannot delete protected interface',
      delete_not_found: 'Interface does not exist',
      details: 'Details',
      delete: 'Delete',
      cancel: 'Cancel',
      confirm: 'Confirm'
    },
    types: {
      ethernet: 'Ethernet',
      wireless: 'Wireless',
      other: 'Other'
    },
    methods: {
      dhcp: 'DHCP',
      static: 'Static',
      unknown: 'Unknown'
    },
    firewall: {
      title: 'Firewall',
      rules: 'Rules',
      enable: 'Enable',
      disable: 'Disable',
      status: {
        active: 'active',
        inactive: 'inactive'
      },
      actions: {
        allow: 'Allow',
        deny: 'Deny'
      },
      rule_action: 'Action'
    }
  },
  widgets: {
    SystemInfoWidget: "System Information",
    RamWidget: "RAM Memory",
    CpuWidget: "CPU Processor",
    FileSystemWidget: "File System"
  },
  systemInfo: {
    system: "System",
    hostname: "Hostname",
    architecture: "Architecture",
    systemTime: "System Time",
    uptime: "Uptime",
    restartRequired: "Restart required",
    cpu: "Processor",
    manufacturer: "Manufacturer",
    model: "Model",
    cores: "Cores",
    speed: "Speed",
    versions: "Versions",
    app: "Application",
    lastUpdate: "Last update",
    node: "Node.js",
    npm: "Npm"
  },
  ram: {
    title: "RAM Memory",
    used: "Used",
    free: "Free",
    active: "Active",
    status: {
      normal: "Normal",
      high: "High",
      critical: "Critical",
      error: "Error"
    },
    lastUpdate: "Last update"
  },
  cpu: {
    title: "Processor",
    usage: "Usage",
    temperature: "Temperature",
    cores: "Cores",
    status: {
      normal: "Normal",
      highLoad: "High load",
      error: "Error"
    },
    lastUpdate: "Last update"
  },
  fileSystem: {
    title: "File System",
    device: "Device",
    mount: "Mount point",
    size: "Size",
    usage: "Usage",
    autoRefresh: "Auto refresh",
    refresh: "Refresh",
    autoRefreshOn: 'Auto refresh enabled',
    autoRefreshOff: 'Auto refresh disabled',
    lastUpdate: "Last update"
  },
  common: {
    yes: "Yes",
    no: "No",
    loading: "Loading...",
    unknown: "Unknown",
    error: "Error",
    na: 'N/A'
  }
}
