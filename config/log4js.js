export default {
  appenders: {
    'STDOUT': {
      type: 'stdout'
    },
    'FILE_ALL': {
      type: 'file',
      filename: './logger/all.log',
      maxLogSize: 10485760,
      backups: 10
    },
    'FILE_ERROR': {
      type: 'datefile',
      filename: './logger/error.log',
      daysToKeep: 30,
      keepFileExt: true
    }
  },
  categories: {
    default: {
      appenders: ['STDOUT', 'FILE_ALL'],
      level: 'debug'
    },
    error: {
      appenders: ['FILE_ERROR'],
      level: 'error'
    }
  }
}
