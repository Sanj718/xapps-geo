/**
 * Test script to verify analytics processing logic with REAL database data
 * 
 * PURPOSE:
 * This file tests the exact logic used in the analytics cleaner cron job
 * using real data from the database to ensure the error handling improvements 
 * don't change the core functionality.
 * 
 * WHAT IT TESTS:
 * - Data parsing and splitting logic
 * - Date filtering (20-day retention)
 * - SQL generation
 * - All 4 analytics types (button, auto, markets_button, markets_auto)
 * - Edge cases (empty data, single values, multiple values)
 * 
 * USAGE:
 * Run with: node test_analytics_logic.js
 * 
 * OUTPUT:
 * Shows original data, processed data, and generated SQL for verification
 * 
 * IMPORTANT:
 * This test file should be updated whenever the core analytics logic changes
 * to ensure the cron job behavior remains consistent.
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Constants from the cron job
const DAYS = 20;
const currentTime = Date.now();
const cutoffTime = currentTime - (DAYS * 24 * 60 * 60 * 1000);

console.log(`🧪 Testing Analytics Logic with REAL Database Data`);
console.log(`📅 Current time: ${new Date(currentTime).toISOString()}`);
console.log(`📅 Cutoff time (${DAYS} days ago): ${new Date(cutoffTime).toISOString()}`);
console.log(`⏰ Cutoff timestamp: ${cutoffTime}`);
console.log("=" .repeat(80));

async function testAnalyticsLogic() {
  try {
    // Get all analytics records from database
    const analytics = await prisma.analytics.findMany({
      orderBy: { shop: 'asc' }
    });

    console.log(`📊 Testing ${analytics.length} analytics records from database\n`);

    for (const record of analytics) {
      console.log(`🏪 Store: ${record.shop}`);
      console.log("-".repeat(60));

      // Test each analytics type
      const types = [
        { name: 'Button', data: record.dataButton, field: 'dataButton' },
        { name: 'Auto', data: record.dataAuto, field: 'dataAuto' },
        { name: 'Markets Button', data: record.dataMarketsButton, field: 'dataMarketsButton' },
        { name: 'Markets Auto', data: record.dataMarketsAuto, field: 'dataMarketsAuto' }
      ];

      for (const type of types) {
        console.log(`\n📈 ${type.name} Analytics:`);
        
        if (!type.data || type.data === '') {
          console.log(`   Original: (empty)`);
          console.log(`   Processed: (empty)`);
          console.log(`   SQL: No update needed`);
          continue;
        }

        // Parse the data (same logic as cron job)
        const dataArray = type.data.split(',').map(Number);
        console.log(`   Original: ${dataArray.length} events`);
        console.log(`   Sample timestamps: ${dataArray.slice(0, 3).join(', ')}${dataArray.length > 3 ? '...' : ''}`);

        // Filter by date (same logic as cron job)
        const filteredData = dataArray.filter(timestamp => timestamp >= cutoffTime);
        const removedCount = dataArray.length - filteredData.length;
        
        console.log(`   Processed: ${filteredData.length} events (removed ${removedCount} old events)`);
        
        if (filteredData.length > 0) {
          console.log(`   Sample filtered: ${filteredData.slice(0, 3).join(', ')}${filteredData.length > 3 ? '...' : ''}`);
        }

        // Generate SQL (same logic as cron job)
        if (filteredData.length === 0) {
          console.log(`   SQL: UPDATE analytics SET ${type.field} = '' WHERE shop = '${record.shop}'`);
        } else {
          const updatedData = filteredData.map(timestamp => timestamp.toString()).join(',');
          console.log(`   SQL: UPDATE analytics SET ${type.field} = '${updatedData}' WHERE shop = '${record.shop}'`);
        }

        // Show what would be removed
        if (removedCount > 0) {
          const oldData = dataArray.filter(timestamp => timestamp < cutoffTime);
          const oldestRemoved = Math.min(...oldData);
          const newestRemoved = Math.max(...oldData);
          console.log(`   🗑️  Removed events from: ${new Date(oldestRemoved).toISOString()} to ${new Date(newestRemoved).toISOString()}`);
        }
      }

      console.log("\n" + "=".repeat(80));
    }

    // Summary statistics
    console.log("\n📊 SUMMARY STATISTICS:");
    console.log("=" .repeat(40));
    
    let totalOriginalEvents = 0;
    let totalFilteredEvents = 0;
    let totalRemovedEvents = 0;

    for (const record of analytics) {
      const types = [
        { data: record.dataButton },
        { data: record.dataAuto },
        { data: record.dataMarketsButton },
        { data: record.dataMarketsAuto }
      ];

      for (const type of types) {
        if (type.data && type.data !== '') {
          const dataArray = type.data.split(',').map(Number);
          const filteredData = dataArray.filter(timestamp => timestamp >= cutoffTime);
          
          totalOriginalEvents += dataArray.length;
          totalFilteredEvents += filteredData.length;
          totalRemovedEvents += (dataArray.length - filteredData.length);
        }
      }
    }

    console.log(`Total original events: ${totalOriginalEvents}`);
    console.log(`Total events after filtering: ${totalFilteredEvents}`);
    console.log(`Total events to be removed: ${totalRemovedEvents}`);
    console.log(`Retention rate: ${((totalFilteredEvents / totalOriginalEvents) * 100).toFixed(1)}%`);

  } catch (error) {
    console.error("❌ Error testing analytics logic:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the test
testAnalyticsLogic();
