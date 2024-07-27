#!/bin/bash

BUILD_DIR=../build
mkdir -p $BUILD_DIR/live

DROOT=$BUILD_DIR/linux-root
#sudo rm -rf $DROOT
#sudo debootstrap --verbose --variant=minbase stable $LINUX_ROOT  && sudo chown mhinkel -R $DROOT

sudo mount --rbind /dev $DROOT/dev
sudo mount -t proc /proc $DROOT/proc
sudo mount --rbind /sys $DROOT/sys
sudo mount -o bind /run $DROOT/run

echo "cwi-live" | sudo tee "${DROOT}/etc/hostname"

# Installing debs in live-image
sudo chroot $DROOT << EOF
apt-get update && \
apt-get install -y --no-install-recommends \
    linux-image-amd64 \
    live-boot \
    systemd-sysv \
    curl \
    openssh-client && \
    apt-get purge $(aptitude search '~i!~M!~prequired!~pimportant!~R~prequired!~R~R~prequired!~R~pimportant!~R~R~pimportant!busybox!grub!initramfs-tools' | awk '{print $2}') && \
    apt-get purge aptitude && \
    apt-get autoremove && \
    apt-get clean
EOF

sudo umount -R $DROOT

sudo mksquashfs \
    $DROOT \
    "${BUILD_DIR}/live/filesystem.squashfs" \
    -e boot

# EFIs
#echo "Preparing EFIs..." && cd $BUILD_DIR && \
#    apt download grub-efi-amd64-signed shim-signed -y && \
#    dpkg-deb --fsys-tarfile grub-efi-amd64-signed*deb | tar x && \
#    dpkg-deb --fsys-tarfile ./shim-signed*.deb | tar x && \
#    cp usr/lib/grub/x86_64-efi-signed/grubnetx64.efi.signed grubx64.efi && \
#    cp usr/lib/shim/shimx64.efi.signed shimx64.efi && \
#    rm -rf usr grub-efi*.deb shim-signed*.deb

