﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ThickTech.BE.Domain.Exceptions;

public sealed class GatheringInvitationsValidBeforeInHoursIsNullDomainException : DomainException
{
    public GatheringInvitationsValidBeforeInHoursIsNullDomainException(string message) : base(message)
    {
    }
}