module.exports = {
  UNKNOWN: {
    errno: -1,
    description: 'unknown error'
  },
  OK: {
    errno: 0,
    description: 'success'
  },
  EOF: {
    errno: 1,
    description: 'end of file'
  },
  EADDRINFO: {
    errno: 2,
    description: 'getaddrinfo error'
  },
  EACCES: {
    errno: 3,
    description: 'permission denied'
  },
  EAGAIN: {
    errno: 4,
    description: 'resource temporarily unavailable'
  },
  EADDRINUSE: {
    errno: 5,
    description: 'address already in use'
  },
  EADDRNOTAVAIL: {
    errno: 6,
    description: 'address not available'
  },
  EAFNOSUPPORT: {
    errno: 7,
    description: 'address family not supported'
  },
  EALREADY: {
    errno: 8,
    description: 'connection already in progress'
  },
  EBADF: {
    errno: 9,
    description: 'bad file descriptor'
  },
  EBUSY: {
    errno: 10,
    description: 'resource busy or locked'
  },
  ECONNABORTED: {
    errno: 11,
    description: 'software caused connection abort'
  },
  ECONNREFUSED: {
    errno: 12,
    description: 'connection refused'
  },
  ECONNRESET: {
    errno: 13,
    description: 'connection reset by peer'
  },
  EDESTADDRREQ: {
    errno: 14,
    description: 'destination address required'
  },
  EFAULT: {
    errno: 15,
    description: 'bad address in system call argument'
  },
  EHOSTUNREACH: {
    errno: 16,
    description: 'host is unreachable'
  },
  EINTR: {
    errno: 17,
    description: 'interrupted system call'
  },
  EINVAL: {
    errno: 18,
    description: 'invalid argument'
  },
  EISCONN: {
    errno: 19,
    description: 'socket is already connected'
  },
  EMFILE: {
    errno: 20,
    description: 'too many open files'
  },
  EMSGSIZE: {
    errno: 21,
    description: 'message too long'
  },
  ENETDOWN: {
    errno: 22,
    description: 'network is down'
  },
  ENETUNREACH: {
    errno: 23,
    description: 'network is unreachable'
  },
  ENFILE: {
    errno: 24,
    description: 'file table overflow'
  },
  ENOBUFS: {
    errno: 25,
    description: 'no buffer space available'
  },
  ENOMEM: {
    errno: 26,
    description: 'not enough memory'
  },
  ENOTDIR: {
    errno: 27,
    description: 'not a directory'
  },
  EISDIR: {
    errno: 28,
    description: 'illegal operation on a directory'
  },
  ENONET: {
    errno: 29,
    description: 'machine is not on the network'
  },
  ENOTCONN: {
    errno: 31,
    description: 'socket is not connected'
  },
  ENOTSOCK: {
    errno: 32,
    description: 'socket operation on non-socket'
  },
  ENOTSUP: {
    errno: 33,
    description: 'operation not supported on socket'
  },
  ENOENT: {
    errno: 34,
    description: 'no such file or directory'
  },
  ENOSYS: {
    errno: 35,
    description: 'function not implemented'
  },
  EPIPE: {
    errno: 36,
    description: 'broken pipe'
  },
  EPROTO: {
    errno: 37,
    description: 'protocol error'
  },
  EPROTONOSUPPORT: {
    errno: 38,
    description: 'protocol not supported'
  },
  EPROTOTYPE: {
    errno: 39,
    description: 'protocol wrong type for socket'
  },
  ETIMEDOUT: {
    errno: 40,
    description: 'connection timed out'
  },
  ECHARSET: {
    errno: 41,
    description: 'invalid Unicode character'
  },
  EAIFAMNOSUPPORT: {
    errno: 42,
    description: 'address family for hostname not supported'
  },
  EAISERVICE: {
    errno: 44,
    description: 'servname not supported for ai_socktype'
  },
  EAISOCKTYPE: {
    errno: 45,
    description: 'ai_socktype not supported'
  },
  ESHUTDOWN: {
    errno: 46,
    description: 'cannot send after transport endpoint shutdown'
  },
  EEXIST: {
    errno: 47,
    description: 'file already exists'
  },
  ESRCH: {
    errno: 48,
    description: 'no such process'
  },
  ENAMETOOLONG: {
    errno: 49,
    description: 'name too long'
  },
  EPERM: {
    errno: 50,
    description: 'operation not permitted'
  },
  ELOOP: {
    errno: 51,
    description: 'too many symbolic links encountered'
  },
  EXDEV: {
    errno: 52,
    description: 'cross-device link not permitted'
  },
  ENOTEMPTY: {
    errno: 53,
    description: 'directory not empty'
  },
  ENOSPC: {
    errno: 54,
    description: 'no space left on device'
  },
  EIO: {
    errno: 55,
    description: 'i/o error'
  },
  EROFS: {
    errno: 56,
    description: 'read-only file system'
  },
  ENODEV: {
    errno: 57,
    description: 'no such device'
  },
  ESPIPE: {
    errno: 58,
    description: 'invalid seek'
  },
  ECANCELED: {
    errno: 59,
    description: 'operation canceled'
  }
};