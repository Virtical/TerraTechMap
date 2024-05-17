﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Terra.Server.Data;

#nullable disable

namespace Terra.Server.Migrations
{
    [DbContext(typeof(TerraServerContext))]
    partial class TerraServerContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Terra.Server.Models.Checkpoint", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("Type")
                        .HasColumnType("int");

                    b.Property<int>("WayId")
                        .HasColumnType("int");

                    b.Property<double>("X")
                        .HasColumnType("float");

                    b.Property<double>("Y")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.HasIndex("WayId");

                    b.ToTable("Checkpoint");
                });

            modelBuilder.Entity("Terra.Server.Models.Cordinate", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Cords")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("WayId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("WayId");

                    b.ToTable("Cordinate");
                });

            modelBuilder.Entity("Terra.Server.Models.Way", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Author")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Color")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Length")
                        .HasColumnType("float");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Season")
                        .HasColumnType("int");

                    b.Property<int?>("Time")
                        .HasColumnType("int");

                    b.Property<int>("Transport")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Way");
                });

            modelBuilder.Entity("Terra.Server.Models.Checkpoint", b =>
                {
                    b.HasOne("Terra.Server.Models.Way", null)
                        .WithMany("Checkpoints")
                        .HasForeignKey("WayId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Terra.Server.Models.Cordinate", b =>
                {
                    b.HasOne("Terra.Server.Models.Way", null)
                        .WithMany("Cordinates")
                        .HasForeignKey("WayId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Terra.Server.Models.Way", b =>
                {
                    b.Navigation("Checkpoints");

                    b.Navigation("Cordinates");
                });
#pragma warning restore 612, 618
        }
    }
}